chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CHECK_EMAIL_HASH") {
    const { emailHash } = message;

    // Retrieve the checkedEmails array from local storage
    chrome.storage.local.get({ checkedEmails: [] }, (items) => {
      const checkedEmails = items.checkedEmails;
      const alreadyChecked = checkedEmails.includes(emailHash);
      sendResponse({ alreadyChecked });

      // If not already checked, add it to the list and update local storage
      if (!alreadyChecked) {
        checkedEmails.push(emailHash);
        
        // Keep only the last 35 hashes (remove oldest if exceeding limit)
        if (checkedEmails.length > 35) {
          checkedEmails.shift(); // Remove the oldest hash (first element)
          console.log("🗑️ Removed oldest hash, keeping last 35");
        }
        
        chrome.storage.local.set({ checkedEmails }, () => {
          console.log("✅ Email hash added to local storage.");
        });
      }
    });

    return true; // Indicate that the response will be sent asynchronously
  }

  if (message.type === "CHECK_EMAIL") {
    const url = "BLANK";
    const payload = JSON.stringify({ email: message.content });

    console.log("📡 Sending POST to:", url);
    console.log("🧾 With payload:", payload);

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload
    })
      .then(res => res.json())
      .then(data => {
        console.log("Response:", data);
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon.png",
          title: "Phishing Check",
          message: data.is_phishing
            ? "⚠️ This Email Looks Suspicious!"
            : "✅ This Email Appears Safe."
        });

        sendResponse({ success: true, data });
      })
      .catch(err => {
        console.error("❌ Fetch failed");
        sendResponse({ success: false, error: err.message });
      });

    return true;
  }
});

