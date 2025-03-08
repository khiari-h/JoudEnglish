// src/data/exercises/chatbot/chatbotA1.js

const chatbotA1Data = {
  exercises: [
    {
      title: "At the Coffee Shop",
      description:
        "Practice ordering a coffee and making small talk with the barista. Use simple phrases and vocabulary.",
      steps: [
        {
          botMessage:
            "Good morning! Welcome to City Coffee. What can I get for you today?",
          suggestions: [
            "Hello, I would like a coffee, please.",
            "Good morning. Can I have a tea?",
            "Hi there!",
          ],
          help: "Start with a greeting (Hello/Good morning) and then make a simple request using 'I would like...' or 'Can I have...'",
        },
        {
          botMessage: "Sure thing! Would you like a small, medium, or large?",
          suggestions: [
            "A small, please.",
            "Medium, please.",
            "I would like a large.",
          ],
          help: "Just say the size with 'please' or use 'I would like...' to be polite.",
        },
        {
          botMessage:
            "Would you like anything else with that? We have some delicious muffins today.",
          suggestions: [
            "No, thank you.",
            "Yes, one muffin please.",
            "What kind of muffins do you have?",
          ],
          help: "You can politely decline with 'No, thank you' or request more information by asking a question.",
        },
        {
          botMessage: "We have chocolate, blueberry, and banana muffins.",
          suggestions: [
            "I'll take a chocolate muffin.",
            "A blueberry muffin, please.",
            "No muffin for me, thanks.",
          ],
          help: "Choose a muffin flavor or politely say no again.",
        },
        {
          botMessage: "That will be $5.50. How would you like to pay?",
          suggestions: [
            "By card, please.",
            "I'll pay with cash.",
            "Can I pay with my phone?",
          ],
          help: "Mention your payment method using simple phrases.",
        },
        {
          botMessage:
            "Perfect. Your order will be ready in a moment. It's a nice day today, isn't it?",
          suggestions: [
            "Yes, it's beautiful outside.",
            "It's a bit cold, but nice.",
            "I like sunny days.",
          ],
          help: "Make a simple comment about the weather using basic vocabulary.",
        },
        {
          botMessage: "Here's your order. Enjoy your coffee! Have a great day!",
          suggestions: [
            "Thank you. Have a nice day too!",
            "Thanks a lot!",
            "Thank you. Goodbye!",
          ],
          help: "End the conversation with a polite thank you and goodbye.",
        },
      ],
    },
    {
      title: "Meeting a New Friend",
      description:
        "Practice introducing yourself and asking simple questions about someone's life and interests.",
      steps: [
        {
          botMessage:
            "Hi there! I'm Emma. I'm new to this language class. What's your name?",
          suggestions: [
            "Hello! My name is...",
            "Hi Emma. I'm...",
            "Nice to meet you! I'm...",
          ],
          help: "Respond with a greeting and tell her your name using 'My name is...' or 'I'm...'",
        },
        {
          botMessage: "It's nice to meet you! Where are you from?",
          suggestions: ["I'm from...", "I come from...", "I live in..."],
          help: "Tell her where you're from using 'I'm from...' or 'I come from...'",
        },
        {
          botMessage:
            "That's interesting! How long have you been studying English?",
          suggestions: [
            "For two months.",
            "I started last year.",
            "This is my first class.",
          ],
          help: "Use simple past tense or time expressions to say how long you've been studying.",
        },
        {
          botMessage: "I see. Do you like learning languages?",
          suggestions: [
            "Yes, I enjoy it a lot.",
            "Yes, but it's difficult.",
            "I like English, but it's not easy.",
          ],
          help: "Express a simple opinion using 'I like/enjoy...' and maybe mention if it's easy or difficult.",
        },
        {
          botMessage: "I agree. What do you do in your free time?",
          suggestions: [
            "I like to read books.",
            "I play soccer.",
            "I watch movies with friends.",
          ],
          help: "Talk about a hobby or activity using 'I like to...' or 'I play/watch/read...'",
        },
        {
          botMessage:
            "That sounds fun! I enjoy playing the guitar and hiking on weekends. Do you have any plans for the weekend?",
          suggestions: [
            "I'm going to visit my family.",
            "No special plans.",
            "I will study for an exam.",
          ],
          help: "Use 'going to' or 'will' to talk about future plans, or say you don't have special plans.",
        },
        {
          botMessage:
            "Cool! Would you like to join our study group on Saturday morning? We practice English together.",
          suggestions: [
            "Yes, I'd like that.",
            "What time is it?",
            "Sorry, I can't this Saturday.",
          ],
          help: "Accept or decline the invitation, or ask for more information.",
        },
        {
          botMessage:
            "It's at 10 AM at the library. We usually study for about two hours.",
          suggestions: [
            "Sounds good! I'll be there.",
            "Can I bring a friend?",
            "Thanks for the invitation.",
          ],
          help: "Confirm your attendance, ask another question, or thank her for the invitation.",
        },
        {
          botMessage:
            "Great! Here's my phone number so we can stay in touch. It was nice talking to you!",
          suggestions: [
            "Nice talking to you too!",
            "See you on Saturday!",
            "Thank you for your help!",
          ],
          help: "End the conversation politely by saying goodbye or confirming when you'll meet again.",
        },
      ],
    },
    {
      title: "Asking for Directions",
      description:
        "Practice asking for and understanding simple directions to popular places in a city.",
      steps: [
        {
          botMessage: "Excuse me, you look lost. Can I help you?",
          suggestions: [
            "Yes, please. I'm looking for the museum.",
            "Hello. Where is the train station?",
            "I need to find a supermarket. Can you help?",
          ],
          help: "Start with 'Yes, please' and then ask where a place is using 'I'm looking for...' or 'Where is...'",
        },
        {
          botMessage:
            "The museum is about 10 minutes from here. Do you want to walk or take the bus?",
          suggestions: [
            "I prefer to walk.",
            "Is it far to walk?",
            "Which bus should I take?",
          ],
          help: "Express your preference or ask a follow-up question about distance or transportation.",
        },
        {
          botMessage:
            "It's not far to walk. Go straight on this street for two blocks, then turn right at the traffic lights.",
          suggestions: [
            "Two blocks, then right. Got it.",
            "Are there signs to follow?",
            "Can you repeat that, please?",
          ],
          help: "Confirm you understood, ask for clarification, or request repetition if needed.",
        },
        {
          botMessage:
            "Yes, after you turn right, you'll see signs for the museum. Continue for about 5 minutes and it's on your left, next to a big park.",
          suggestions: [
            "Next to a park. Thank you!",
            "Is the museum open today?",
            "How much is the entrance fee?",
          ],
          help: "Thank the person for directions or ask practical questions about opening hours or prices.",
        },
        {
          botMessage:
            "The museum is open from 9 AM to 5 PM, and tickets cost $10 for adults. There's a special exhibition today.",
          suggestions: [
            "That sounds interesting!",
            "Is there a café in the museum?",
            "Thanks for your help!",
          ],
          help: "Show interest, ask another practical question, or thank the person for their help.",
        },
        {
          botMessage:
            "Yes, there's a nice café on the top floor with a view of the city. I recommend trying their cake!",
          suggestions: [
            "I'll check it out. Thanks!",
            "That sounds perfect.",
            "You're very helpful, thank you!",
          ],
          help: "Express appreciation for the recommendation and thank the person.",
        },
        {
          botMessage:
            "You're welcome! Enjoy your visit to the museum. Have a great day!",
          suggestions: [
            "Thank you. Have a nice day too!",
            "Thanks for your help. Goodbye!",
            "I appreciate your help. Bye!",
          ],
          help: "End the conversation politely with a thank you and goodbye.",
        },
      ],
    },
    {
      title: "Shopping for Clothes",
      description:
        "Practice shopping vocabulary and expressions to buy clothes in a store.",
      steps: [
        {
          botMessage:
            "Hello! Welcome to Fashion Shop. Can I help you find something today?",
          suggestions: [
            "I'm looking for a T-shirt.",
            "Do you have jeans in my size?",
            "I'm just looking, thanks.",
          ],
          help: "Say what you're looking for using 'I'm looking for...' or say you're just browsing.",
        },
        {
          botMessage:
            "Of course! We have T-shirts in this section. What size do you need?",
          suggestions: [
            "I wear size medium.",
            "I think I'm a large.",
            "I'm not sure. Can I try it on?",
          ],
          help: "Tell your size using 'I wear size...' or ask to try on clothes if you're not sure.",
        },
        {
          botMessage:
            "Sure! We have medium T-shirts in blue, red, and black. Which color would you prefer?",
          suggestions: [
            "I like the blue one.",
            "Can I see the red one?",
            "Do you have any in green?",
          ],
          help: "Express color preference using 'I like...' or ask to see a specific color.",
        },
        {
          botMessage:
            "Here's the blue T-shirt in medium. The fitting rooms are over there if you'd like to try it on.",
          suggestions: [
            "Thank you. I'll try it on.",
            "How much does it cost?",
            "Do you have it in a different style?",
          ],
          help: "Thank them and say you'll try it on, or ask about the price or other options.",
        },
        {
          botMessage:
            "This T-shirt is $15.99. We also have a special offer: buy two T-shirts and get 20% off the total.",
          suggestions: [
            "That's a good deal.",
            "I'll just take this one for now.",
            "Do you accept credit cards?",
          ],
          help: "Comment on the price or offer, decide how many to buy, or ask about payment methods.",
        },
        {
          botMessage:
            "Yes, we accept all major credit cards. Will there be anything else today?",
          suggestions: [
            "No, just the T-shirt please.",
            "Do you sell socks?",
            "Can I see your jackets too?",
          ],
          help: "Say if you want to buy just the T-shirt or ask about other items.",
        },
        {
          botMessage:
            "Great! I'll meet you at the register when you're ready to check out.",
          suggestions: [
            "I'm ready now.",
            "Thank you for your help.",
            "I'll look around a bit more.",
          ],
          help: "Tell them if you're ready to pay now or want to continue shopping.",
        },
        {
          botMessage:
            "Your total comes to $15.99. Would you like the receipt in the bag or with you?",
          suggestions: [
            "In the bag, please.",
            "I'll take it with me.",
            "Can I have a gift receipt?",
          ],
          help: "Tell them where you want the receipt or ask for a gift receipt.",
        },
        {
          botMessage:
            "Here you go! Thank you for shopping with us today. Have a wonderful day!",
          suggestions: [
            "Thank you. Goodbye!",
            "Thanks for your help.",
            "Have a nice day too!",
          ],
          help: "End the conversation politely with a thank you and goodbye.",
        },
      ],
    },
    {
      title: "Making a Restaurant Reservation",
      description:
        "Practice making a reservation at a restaurant, including specifying date, time, and number of people.",
      steps: [
        {
          botMessage: "Good afternoon, Roma Restaurant. How can I help you?",
          suggestions: [
            "I'd like to make a reservation, please.",
            "Do you have a table for tonight?",
            "Hello, are you open on Sunday?",
          ],
          help: "Start with a polite request to make a reservation or ask about availability.",
        },
        {
          botMessage:
            "Yes, we're open every day. When would you like to come in?",
          suggestions: [
            "Tonight at 7 PM.",
            "This Friday at 8 PM.",
            "Tomorrow for lunch.",
          ],
          help: "Specify when you want to visit using day and time expressions.",
        },
        {
          botMessage: "How many people will be in your party?",
          suggestions: [
            "Just two people.",
            "Table for four, please.",
            "There will be three of us.",
          ],
          help: "Indicate the number of people using 'Table for...' or 'There will be... of us.'",
        },
        {
          botMessage:
            "Let me check our availability... Yes, we have a table for two at 7 PM tonight. May I have your name for the reservation?",
          suggestions: [
            "My name is...",
            "It's under...",
            "The reservation is for...",
          ],
          help: "Provide your name using 'My name is...' or 'It's under...'",
        },
        {
          botMessage:
            "Thank you. And may I have a phone number where we can reach you?",
          suggestions: ["My number is...", "You can reach me at...", "It's..."],
          help: "Give your phone number using 'My number is...' or 'You can reach me at...'",
        },
        {
          botMessage:
            "Perfect. Do you have any special requests or dietary restrictions we should know about?",
          suggestions: [
            "No, nothing special.",
            "I'm vegetarian.",
            "We need a high chair for a child.",
          ],
          help: "Mention any dietary needs or special requests, or say 'No, nothing special.'",
        },
        {
          botMessage:
            "I've noted that down. Your reservation is confirmed for tonight at 7 PM for two people. Our address is 123 Main Street. Can you find us okay?",
          suggestions: [
            "Yes, I know where it is.",
            "Could you tell me the nearest bus stop?",
            "Is there parking nearby?",
          ],
          help: "Confirm you know the location or ask for directions/parking information.",
        },
        {
          botMessage:
            "There's a public parking lot one block away on Park Street. Your table will be held for 15 minutes after your reservation time.",
          suggestions: [
            "Great, thank you.",
            "What time do you close?",
            "Do I need to call if we're running late?",
          ],
          help: "Thank them for the information or ask another practical question.",
        },
        {
          botMessage:
            "We close at 10 PM, and yes, please call if you're running more than 15 minutes late. We look forward to seeing you tonight!",
          suggestions: [
            "Thank you. See you later!",
            "Thanks for your help.",
            "I appreciate it. Goodbye!",
          ],
          help: "End the conversation politely with a thank you and goodbye.",
        },
      ],
    },
  ],
};

export default chatbotA1Data;
