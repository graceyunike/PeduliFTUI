# PeduliFTUI — AI-Powered Donation Platform

## Overview
PeduliFTUI is a web-based donation platform designed to enhance transparency and trust between donors and campaign organizers. The system integrates an AI-powered sentiment analysis module using Natural Language Processing (NLP) to evaluate donor feedback and generate a real-time trust score through a feature called the Trust Gauge. This enables users to make informed decisions before contributing to donation campaigns.

## Key Features
- Donation campaign creation and management  
- Real-time donation tracking  
- User authentication and role-based access control  
- Comment system for donor feedback  
- AI-powered sentiment analysis using NLP  
- Trust Gauge visualization based on aggregated sentiment  
- Payment gateway integration for secure transactions  

## AI & NLP Integration
The platform incorporates an AI-based sentiment analysis system to process donor comments and assess platform trustworthiness.

### Workflow:
1. Users submit comments on campaign posts  
2. Comments are validated and sent to the backend  
3. The AI service analyzes the sentiment using an LLM via API  
4. The system classifies comments as "trusted" or "untrusted" with a confidence score  
5. Aggregated results are used to calculate the Trust Gauge percentage  

### Approach:
- Prompt engineering for structured sentiment classification  
- JSON-based response validation  
- No fine-tuning or embeddings in the current implementation (MVP phase)  
- Designed for scalability with potential future enhancements (RAG, fine-tuning)

## System Architecture

### Frontend
- React.js  
- Axios for API communication  

### Backend
- Node.js with Express.js  
- RESTful API architecture  
- Controller-service pattern  

### Database
- MongoDB   

### AI Service
- External LLM API (DeepSeek via OpenRouter)  
- NLP-based sentiment analysis  

### External Services
- Midtrans Payment Gateway (HTTPS integration)  

## Data Model
The system includes several core entities:
- Users  
- Donation Campaigns  
- Donations  
- Timeline Posts  
- Comments  
- Sentiment Analysis  

These entities are connected to support campaign tracking, user interaction, and AI-driven insights.

## Evaluation Metrics
The system performance is evaluated using:
- Sentiment classification accuracy (target > 85%)  
- API latency (target < 5 seconds)  
- System reliability and uptime  
- User engagement metrics (comments and interactions)  

## Risk Management
Potential risks and mitigations include:
- Bias in sentiment analysis → addressed through diverse testing and prompt refinement  
- API dependency → fallback mechanism using "pending" sentiment  
- Spam comments → validation rules and rate limiting  
- Cost control → monitoring API usage and implementing limits  

## Security & Guardrails
- Input validation and content filtering before AI processing  
- Structured JSON output enforcement to prevent malformed responses  
- Authentication and access control for protected endpoints  
- Logging and monitoring of AI decisions for transparency  
- Secure communication using HTTPS  

## Future Improvements
- Asynchronous processing using job queues  
- Fine-tuning with labeled dataset  
- Implementation of embeddings and semantic search  
- Retrieval-Augmented Generation (RAG) for advanced analysis  
- Admin moderation dashboard  

## Conclusion
PeduliFTUI demonstrates how modern software engineering practices can be combined with AI and NLP technologies to build a transparent and trustworthy digital donation platform. The Trust Gauge feature provides data-driven insights that enhance user confidence and improve decision-making in online fundraising.