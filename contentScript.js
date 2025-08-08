function extractEmailBody() {
  const emailElement = document.querySelector('.a3s');

  if (emailElement) {
    let emailBody = emailElement.innerText;

    const subjectElement = document.querySelector('h2.hP');
    const subject = subjectElement ? subjectElement.innerText : 'Subject not found';

    const senderElement = document.querySelector('.gD');
    const sender = senderElement ? senderElement.getAttribute('email') : 'Sender not found';

    emailBody = "Subject: " + subject + "\n" +
                "Sender: " + sender + "\n\n" + emailBody;

    console.log("📧 Extracted Email Body:\n", emailBody);

    if (!emailBody) {
      console.log("⚠️ No email body found to check");
      console.log("test", document.querySelector('.a3s'));
      return;
    }

    chrome.runtime.sendMessage(
      { type: "CHECK_EMAIL", content: emailBody },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error("❌ Runtime error:", chrome.runtime.lastError.message);
        } else {
          console.log("📨 Background Responded ");

          if (isMaliciousEmail(emailBody)) {
            emailBody = "";
            console.warn("⚠️ Malicious content detected in email body");
            const cautionElements = document.createElement("div");
            cautionElements.style.color = "red";
            cautionElements.style.fontWeight = "bold";
            cautionElements.style.marginBottom = "5px";
            cautionElements.style.fontSize = "14px";
            cautionElements.innerText = "Malicious content detected in response. API may be compromised. Please contact developer at grantklein528@gmail.com";
            emailElement.prepend(cautionElements);
            return;
          }

          else if (response.data.is_phishing === "Internal API server error. Please try again later.") {
            const cautionElements = document.createElement("div");
            cautionElements.style.color = "red";
            cautionElements.style.fontWeight = "bold";
            cautionElements.style.marginBottom = "5px";
            cautionElements.style.fontSize = "14px";
            cautionElements.innerText = "Internal API server error. Please try again later.";
            emailElement.prepend(cautionElements);
          } else if (response.data.is_phishing === "API rate limit exceeded. Please wait 24 hours before trying again.") {
            const cautionElements = document.createElement("div");
            cautionElements.style.color = "red";
            cautionElements.style.fontWeight = "bold";
            cautionElements.style.marginBottom = "5px";
            cautionElements.style.fontSize = "14px";
            cautionElements.innerText = "API rate limit exceeded. Please wait 24 hours before trying again.";
            emailElement.prepend(cautionElements);
          }

          const resultText = response.data.is_phishing
            ? "⚠️ This email looks suspicious!"
            : "✅ This email appears safe.";

          const cautionElements = document.createElement("div");
          cautionElements.style.color = "red";
          cautionElements.style.fontWeight = "bold";
          cautionElements.style.marginBottom = "5px";
          cautionElements.style.fontSize = "12x";

          const cautionElement = response.data.result.split("\n").slice(1).filter(line => line.trim() !== "").join("\n");
          
          cautionElements.innerText = cautionElement;
          emailElement.prepend(cautionElements);

          const resultElement = document.createElement("div");
          resultElement.style.color = response.data.is_phishing ? "red" : "green";
          resultElement.style.fontWeight = "bold";
          resultElement.style.marginBottom = "5px";
          resultElement.style.fontSize = "16px";
          resultElement.innerText = `Phishing Check Result: ${resultText}`;

          emailElement.prepend(resultElement);
          console.log("✅ Result injected at the top of email body");

          if (response.data.is_phishing) {
            chrome.storage.local.get({ coinCount: 0 }, (items) => {
              if (items.coinCount < 99) {
                 items.coinCount += 1;
              }
              chrome.storage.local.set({ coinCount: items.coinCount }, () => {
                console.log(`✅ Coin count updated: ${items.coinCount}`);
                chrome.runtime.sendMessage({ type: "COIN_COUNT_UPDATED" });
              });
            });
          }
        }
      }
    );
  }
}

function isMaliciousEmail(emailBody) {
  const patterns = [
  /<script.*?>.*?<\/script>/gi,         // Script tags
  /javascript:/gi,                      // JS protocol
  /on\w+\s*=/gi,                        // Event handlers like onload, onclick
  /<iframe.*?>.*?<\/iframe>/gi,         // Iframes
  /<img.*?src=.*?>/gi,                  // Suspicious images
  /eval\(/gi,                           // JS eval
  /document\.cookie/gi,                 // Cookie access
  /window\.location/gi,                 // Redirection
  /style\s*=\s*['"]?expression\(/gi     // CSS expressions
  ];

  return patterns.some(pattern => pattern.test(emailBody));
}

extractEmailBody();
