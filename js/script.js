// DOM Elements
const messageForm = document.getElementById("message-form");
const resultsContainer = document.getElementById("results-container");
const messageResult = document.getElementById("message-result");
const copyButton = document.getElementById("copy-message");
const regenerateButton = document.getElementById("regenerate-message");
const messagesRemainingElement = document.getElementById("messages-remaining");
const monthlyPlanButton = document.getElementById("monthly-plan-button");
const annualPlanButton = document.getElementById("annual-plan-button");
const subscriptionModal = document.getElementById("subscription-modal");
const closeModalButton = document.querySelector(".close-modal");

// Message Templates
const messageTemplates = {
  sales: {
    professional: {
      template: `Hi {{recipientName}},

I noticed your work at {{recipientCompany}} in the {{recipientRole}} space. {{personalization}}

At {{senderCompany}}, we've been helping similar companies with [specific value proposition]. I'd love to share how we might be able to help your team achieve [specific outcome].

Would you be open to a brief conversation next week?

Best regards,
{{senderName}}
{{senderTitle}}, {{senderCompany}}`,
      followUps: [
        "I wanted to follow up on my previous message. Have you had a chance to consider connecting?",
        "Just checking in - I'm still interested in discussing how we might help with [specific pain point].",
      ],
    },
    casual: {
      template: `Hey {{recipientName}}!

I've been following what you and the team at {{recipientCompany}} have been doing in {{recipientRole}}. {{personalization}} Really impressive stuff!

I'm with {{senderCompany}} where we help companies like yours with [specific benefit]. Based on what I've seen from your recent [achievement/announcement], I thought there might be a good fit.

Would you be up for a quick chat next week to explore this?

Cheers,
{{senderName}}
{{senderTitle}}, {{senderCompany}}`,
      followUps: [
        "Hope your week is going well! Just floating my previous message back to the top of your inbox.",
        "Hey again! Still think there's a great opportunity for us to collaborate. Would love to chat when you have a moment.",
      ],
    },
    direct: {
      template: `{{recipientName}},

{{personalization}}

I help {{recipientRole}}s at companies like {{recipientCompany}} [achieve specific outcome] through [your solution].

Our clients typically see [specific metric improvement] within [timeframe].

15-minute call next week to discuss?

{{senderName}}
{{senderTitle}}, {{senderCompany}}`,
      followUps: [
        "Following up on my message about helping your team with [specific outcome].",
        "Quick check-in: Still interested in discussing how we've helped companies like yours achieve [specific result]?",
      ],
    },
    enthusiastic: {
      template: `Hi {{recipientName}}! 👋

I'm genuinely excited to connect with you! Your work at {{recipientCompany}} in the {{recipientRole}} space is fantastic. {{personalization}}

At {{senderCompany}}, we're passionate about helping teams like yours achieve [specific amazing outcome] through our innovative approach to [solution area].

I'd love to share some ideas that have been game-changers for our clients! Could we schedule a 15-min chat next week?

Looking forward to connecting!
{{senderName}}
{{senderTitle}} at {{senderCompany}}`,
      followUps: [
        "Hi again! Just wanted to make sure you saw my message about some exciting opportunities for {{recipientCompany}}!",
        "Still excited about the possibility of working together! Let me know if you'd like to hear how we've helped similar companies achieve [specific outcome]!",
      ],
    },
  },
  recruiting: {
    professional: {
      template: `Hello {{recipientName}},

I'm {{senderName}}, a {{senderTitle}} at {{senderCompany}}. I came across your profile and was impressed by your experience in {{recipientRole}} at {{recipientCompany}}. {{personalization}}

We're currently looking for someone with your background to join our team for a role that involves [key responsibilities].

Would you be interested in having a conversation about this opportunity?

Best regards,
{{senderName}}
{{senderTitle}}, {{senderCompany}}`,
      followUps: [
        "I wanted to follow up regarding the opportunity I mentioned. Would you be interested in learning more?",
        "Just checking if you had a chance to consider the opportunity I shared. I'd be happy to provide more details.",
      ],
    },
    casual: {
      template: `Hey {{recipientName}}!

I'm {{senderName}} from {{senderCompany}}. I came across your profile and was really impressed with your work at {{recipientCompany}}. {{personalization}}

We're building out our team and looking for talented {{recipientRole}}s like yourself. We offer [key benefits/perks] and the chance to work on [interesting projects/products].

Would you be open to a casual chat about what we're building?

Cheers,
{{senderName}}
{{senderTitle}} at {{senderCompany}}`,
      followUps: [
        "Hope things are going well! Just wanted to check if you saw my message about the opportunity at {{senderCompany}}.",
        "Hey again! Still think you'd be a great fit for our team. Let me know if you'd like to hear more about the role.",
      ],
    },
    direct: {
      template: `{{recipientName}},

Your experience as a {{recipientRole}} at {{recipientCompany}} caught my attention. {{personalization}}

{{senderCompany}} is hiring for a [position] that requires your specific expertise in [skill/area].

Key details:
- [Responsibility/requirement 1]
- [Benefit/perk 1]
- [Growth opportunity]

Available for a 15-minute call this week?

{{senderName}}
{{senderTitle}}, {{senderCompany}}`,
      followUps: [
        "Following up on the {{senderCompany}} opportunity I mentioned. Still interested in connecting?",
        "The [position] role is still open and your background is an excellent fit. Would you like to discuss?",
      ],
    },
    enthusiastic: {
      template: `Hi {{recipientName}}! 👋

I'm {{senderName}} from {{senderCompany}}, and I'm absolutely thrilled to connect with you! Your work as a {{recipientRole}} at {{recipientCompany}} is exactly what caught my eye. {{personalization}}

We're building something special at {{senderCompany}} and looking for exceptional talent like yourself to join us on this exciting journey! Our team offers [unique benefits/culture aspects] and the opportunity to [make impact/grow].

I'd love to share more details about this exciting role! Would you be up for a quick chat?

Looking forward to connecting!
{{senderName}}
{{senderTitle}}, {{senderCompany}}`,
      followUps: [
        "Hope you're having a fantastic week! Just circling back on my message about the exciting opportunity at {{senderCompany}}!",
        "Still excited about the possibility of having you join our incredible team! Let me know if you'd like to hear more!",
      ],
    },
  },
  "job-seeking": {
    professional: {
      template: `Dear {{recipientName}},

I hope this message finds you well. I'm {{senderName}}, a {{senderTitle}} with experience at {{senderCompany}}. {{personalization}}

I'm reaching out because I'm interested in exploring opportunities at {{recipientCompany}}. With my background in [relevant skills/experience], I believe I could contribute significantly to your team's success in [specific area].

Would you be open to a brief conversation about potential opportunities where my experience might align with your needs?

Thank you for your consideration.

Best regards,
{{senderName}}`,
      followUps: [
        "I wanted to follow up on my previous message regarding potential opportunities at {{recipientCompany}}.",
        "I'm still very interested in discussing how my experience could benefit your team. Would you have some time for a brief conversation?",
      ],
    },
    casual: {
      template: `Hi {{recipientName}}!

I'm {{senderName}}, currently a {{senderTitle}} at {{senderCompany}}. I've been following {{recipientCompany}} and I'm really impressed with [specific project/achievement]. {{personalization}}

I'm exploring new opportunities and your company is at the top of my list because [specific reason]. My experience with [relevant skill/project] seems well-aligned with what you're building.

Would you be open to a quick chat about how my skills might be a good fit for your team?

Looking forward to hearing from you!
{{senderName}}`,
      followUps: [
        "Hope your week is going well! Just checking in to see if you had a chance to read my previous message about opportunities at {{recipientCompany}}.",
        "Still very interested in connecting about potential roles at {{recipientCompany}}. Let me know if you'd like to chat!",
      ],
    },
    direct: {
      template: `{{recipientName}},

{{personalization}}

I'm a {{senderTitle}} with {{senderCompany}} looking for my next challenge.

Key strengths:
- [Skill/achievement 1]
- [Skill/achievement 2]
- [Skill/achievement 3]

I see {{recipientCompany}} is [growing/innovating] in [area]. Can we discuss how I might contribute to your team's success?

{{senderName}}`,
      followUps: [
        "Following up on my interest in opportunities at {{recipientCompany}}. Would you have time for a brief conversation?",
        "Quick check: Would you be the right person to discuss potential roles that match my expertise in [specific area]?",
      ],
    },
    enthusiastic: {
      template: `Hi {{recipientName}}! 👋

I'm {{senderName}}, and I'm extremely excited about the possibility of joining the amazing team at {{recipientCompany}}! {{personalization}}

Currently, I'm a {{senderTitle}} at {{senderCompany}} where I've [key achievement]. I've been following your work on [specific project/product] and I'm truly inspired by your approach to [industry/problem].

I'd love the opportunity to bring my passion for [relevant skill/interest] to your team and contribute to your mission of [company mission/goal].

Would you be open to a conversation about how my background might be a great fit for {{recipientCompany}}?

Looking forward to connecting!
{{senderName}}`,
      followUps: [
        "Hope you're having a fantastic week! I'm still very excited about the possibility of joining {{recipientCompany}} and would love to chat!",
        "Still enthusiastic about potentially bringing my skills to your amazing team! Would you have time for a quick conversation?",
      ],
    },
  },
  networking: {
    professional: {
      template: `Hello {{recipientName}},

I'm {{senderName}}, a {{senderTitle}} at {{senderCompany}}. I came across your profile and was impressed by your work in {{recipientRole}} at {{recipientCompany}}. {{personalization}}

I'm reaching out to connect with like-minded professionals in the [industry/field]. Your experience with [specific area] particularly caught my attention, and I'd appreciate the opportunity to learn from your insights.

Would you be open to connecting and perhaps having a conversation about [specific topic] in the future?

Best regards,
{{senderName}}
{{senderTitle}}, {{senderCompany}}`,
      followUps: [
        "I wanted to follow up on my connection request. I'm still interested in learning from your experience in [specific area].",
        "Just checking in regarding my previous message. I'd still welcome the opportunity to connect and learn from your expertise.",
      ],
    },
    casual: {
      template: `Hey {{recipientName}}!

I'm {{senderName}} - currently a {{senderTitle}} at {{senderCompany}}. I came across your profile and thought your work at {{recipientCompany}} was really interesting! {{personalization}}

I've been building my network of fellow [industry/role] professionals, and I'd love to connect with you. Your experience with [specific area] is something I'd enjoy learning more about.

Would you be up for connecting? Always great to exchange ideas with others in the field!

Cheers,
{{senderName}}`,
      followUps: [
        "Hope you're having a good week! Just floating my connection request back to the top of your inbox.",
        "Hey again! Still interested in connecting and possibly exchanging ideas about [industry topic]. Let me know!",
      ],
    },
    direct: {
      template: `{{recipientName}},

I'm {{senderName}}, {{senderTitle}} at {{senderCompany}}.

We share [mutual connection/interest/background]. {{personalization}}

Would like to connect because:
- [Specific reason 1]
- [Specific reason 2]
- [Potential mutual benefit]

Open to a brief virtual coffee next week?

{{senderName}}`,
      followUps: [
        "Following up on my connection request. Would still appreciate the opportunity to connect.",
        "Quick check-in: Still interested in connecting to discuss [specific topic].",
      ],
    },
    enthusiastic: {
      template: `Hi {{recipientName}}! 👋

I'm {{senderName}}, a {{senderTitle}} at {{senderCompany}}, and I'm genuinely excited to connect with you! Your work at {{recipientCompany}} in {{recipientRole}} is truly inspiring. {{personalization}}

I'm passionate about [shared interest/industry] and have been following your insights on [specific topic/project]. Your approach to [specific aspect] really resonates with me!

I'd love to connect and perhaps exchange ideas sometime! Would you be open to a virtual coffee chat in the coming weeks?

Looking forward to learning from you!
{{senderName}}`,
      followUps: [
        "Hope you're having an amazing week! Still excited about the possibility of connecting and exchanging ideas!",
        "Just wanted to circle back - would still love to connect and hear more about your experiences with [specific topic]!",
      ],
    },
  },
};

// State
let currentMessageData = {};
let freeMessagesRemaining = 3;
let isSubscribed = false;
let stripeCustomerId = null;

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();

  // Check if user has a subscription
  checkSubscriptionStatus();

  // Update messages remaining display
  updateMessagesRemaining();
});

function initializeApp() {
  // Event Listeners
  messageForm.addEventListener("submit", handleFormSubmit);
  copyButton.addEventListener("click", copyMessageToClipboard);
  regenerateButton.addEventListener("click", regenerateMessage);
  monthlyPlanButton.addEventListener("click", () =>
    showSubscriptionModal("monthly")
  );
  annualPlanButton.addEventListener("click", () =>
    showSubscriptionModal("annual")
  );
  closeModalButton.addEventListener("click", closeSubscriptionModal);

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === subscriptionModal) {
      closeSubscriptionModal();
    }
  });

  // Load stored data from localStorage
  loadUserData();
}

function checkSubscriptionStatus() {
  // In a real implementation, this would check with the server
  // For now, we'll use localStorage as a simple simulation
  isSubscribed = localStorage.getItem("isSubscribed") === "true";

  if (isSubscribed) {
    messagesRemainingElement.textContent = "Unlimited messages (Premium)";
    subscribeButtons = document.querySelectorAll(".pricing-button");
    subscribeButtons.forEach((button) => {
      button.textContent = "Current Plan";
      button.disabled = true;
    });
  }
}

function updateMessagesRemaining() {
  if (!isSubscribed) {
    messagesRemainingElement.textContent = `${freeMessagesRemaining} free messages remaining`;

    // Show subscription modal if no free messages left
    if (freeMessagesRemaining <= 0) {
      showSubscriptionModal("monthly");
    }
  }
}

function loadUserData() {
  // Load remaining free messages count
  const storedCount = localStorage.getItem("freeMessagesRemaining");
  if (storedCount !== null) {
    freeMessagesRemaining = parseInt(storedCount);
  }

  // Load subscription status
  isSubscribed = localStorage.getItem("isSubscribed") === "true";

  updateMessagesRemaining();
}

function saveUserData() {
  localStorage.setItem("freeMessagesRemaining", freeMessagesRemaining);
  localStorage.setItem("isSubscribed", isSubscribed);
}

// Handle Form Submission
async function handleFormSubmit(event) {
  event.preventDefault();

  // Check if user can send messages
  if (freeMessagesRemaining <= 0 && !isSubscribed) {
    showSubscriptionModal("monthly");
    return;
  }

  // Get form data
  const formData = {
    senderName: document.getElementById("sender-name").value,
    senderTitle: document.getElementById("sender-title").value,
    senderCompany: document.getElementById("sender-company").value,
    recipientName: document.getElementById("recipient-name").value,
    recipientTitle: document.getElementById("recipient-title").value,
    recipientCompany: document.getElementById("recipient-company").value,
    messageType: document.getElementById("message-type").value,
    personalization: document.getElementById("personalization").value,
    tone: document.getElementById("message-tone").value,
  };

  // Store current data for regeneration
  currentMessageData = formData;

  // Generate message
  try {
    // Show loading state
    document.getElementById("generate-button").textContent = "Generating...";
    document.getElementById("generate-button").disabled = true;

    // Generate the message
    const message = await generateMessage(formData);

    // Display the message
    messageResult.textContent = message;
    resultsContainer.style.display = "block";

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: "smooth" });

    // If not subscribed, decrement free messages
    if (!isSubscribed) {
      freeMessagesRemaining--;
      saveUserData();
      updateMessagesRemaining();
    }

    // Track analytics event
    trackEvent("message_generated", {
      message_type: formData.messageType,
      tone: formData.tone,
    });
  } catch (error) {
    alert(`Error generating message: ${error.message}`);
    console.error("Message generation error:", error);
  } finally {
    // Reset button state
    document.getElementById("generate-button").textContent = "Generate Message";
    document.getElementById("generate-button").disabled = false;
  }
}

// Message Generation
async function generateMessage(formData) {
  // In a production environment, this would call the OpenAI API
  // For this demo, we'll use templates with replacements

  // Select appropriate template
  const messageType = formData.messageType;
  const tone = formData.tone;

  if (!messageTemplates[messageType] || !messageTemplates[messageType][tone]) {
    return "Sorry, that specific message type and tone combination is not available.";
  }

  let template = messageTemplates[messageType][tone].template;

  // Fill in template with form data
  let message = template
    .replace(/{{senderName}}/g, formData.senderName)
    .replace(/{{senderTitle}}/g, formData.senderTitle)
    .replace(/{{senderCompany}}/g, formData.senderCompany)
    .replace(/{{recipientName}}/g, formData.recipientName)
    .replace(/{{recipientRole}}/g, formData.recipientTitle)
    .replace(/{{recipientCompany}}/g, formData.recipientCompany);

  // Handle personalization
  if (formData.personalization.trim()) {
    message = message.replace(/{{personalization}}/g, formData.personalization);
  } else {
    // Remove the personalization placeholder if empty
    message = message.replace(/{{personalization}}/g, "");
  }

  // In a real implementation with OpenAI API:
  /*
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a professional LinkedIn message writer. Generate a ${tone} tone message for ${messageType} purposes.`
                },
                {
                    role: "user",
                    content: `Write a LinkedIn message from ${formData.senderName} (${formData.senderTitle} at ${formData.senderCompany}) to ${formData.recipientName} (${formData.recipientTitle} at ${formData.recipientCompany}). Personalization notes: ${formData.personalization}`
                }
            ],
            temperature: 0.7,
            max_tokens: 300
        })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
    */

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return message;
}

async function regenerateMessage() {
  if (Object.keys(currentMessageData).length === 0) {
    alert("No message data available for regeneration.");
    return;
  }

  try {
    regenerateButton.textContent = "Regenerating...";
    regenerateButton.disabled = true;

    const message = await generateMessage(currentMessageData);
    messageResult.textContent = message;

    trackEvent("message_regenerated", {
      message_type: currentMessageData.messageType,
    });
  } catch (error) {
    alert(`Error regenerating message: ${error.message}`);
    console.error("Message regeneration error:", error);
  } finally {
    regenerateButton.textContent = "Regenerate";
    regenerateButton.disabled = false;
  }
}

function copyMessageToClipboard() {
  const textToCopy = messageResult.textContent;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      const originalText = copyButton.textContent;
      copyButton.textContent = "Copied!";

      setTimeout(() => {
        copyButton.textContent = originalText;
      }, 2000);

      trackEvent("message_copied", {
        message_type: currentMessageData.messageType,
      });
    })
    .catch((err) => {
      console.error("Failed to copy message: ", err);
      alert("Failed to copy message to clipboard.");
    });
}

// Subscription Modal
function showSubscriptionModal(plan) {
  subscriptionModal.style.display = "flex";
  setupStripeElements(plan);

  trackEvent("subscription_modal_shown", { plan });
}

function closeSubscriptionModal() {
  subscriptionModal.style.display = "none";
}

// Set up Stripe Elements
function setupStripeElements(plan) {
  // In a real implementation, this would create and configure Stripe Elements
  // For this demo, we'll simulate the subscription process

  const submitButton = document.getElementById("submit-payment");

  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();

    // Simulate payment processing
    submitButton.textContent = "Processing...";
    submitButton.disabled = true;

    // Fake processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate successful subscription
    isSubscribed = true;
    saveUserData();

    // Update UI
    messagesRemainingElement.textContent = "Unlimited messages (Premium)";
    closeSubscriptionModal();

    // Show success message
    alert(`Successfully subscribed to the ${plan} plan!`);

    // Disable subscription buttons
    const subscribeButtons = document.querySelectorAll(".pricing-button");
    subscribeButtons.forEach((button) => {
      button.textContent = "Current Plan";
      button.disabled = true;
    });

    trackEvent("subscription_successful", { plan });

    // Reset button state
    submitButton.textContent = "Subscribe Now";
    submitButton.disabled = false;
  });
}

// Analytics
function trackEvent(eventName, eventData) {
  console.log(`Event tracked: ${eventName}`, eventData);

  // In a real implementation, this would send data to Google Analytics, etc.
  /*
    if (typeof gtag === 'function') {
        gtag('event', eventName, eventData);
    }
    */
}
