# 📸 SnapStyle AI

SnapStyle AI is an AI-powered web application that transforms your fashion inspiration into personalized style recommendations. 🌟 Whether you're looking for outfits for a specific occasion or just want to explore trends, SnapStyle AI has you covered. 🚀

![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-green?style=for-the-badge&logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Backend-Node.js-brightgreen?style=for-the-badge&logo=node.js)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=for-the-badge&logo=typescript)
![Firebase](https://img.shields.io/badge/Database-Firebase-orange?style=for-the-badge&logo=firebase)
![Stripe](https://img.shields.io/badge/Payment-Stripe-red?style=for-the-badge&logo=stripe)
![Netlify](https://img.shields.io/badge/Hosting-Netlify-yellow?style=for-the-badge&logo=netlify)
![OpenAI](https://img.shields.io/badge/AI-OpenAI-black?style=for-the-badge&logo=openai)
![Azure](https://img.shields.io/badge/Services-Azure-blue?style=for-the-badge&logo=microsoftazure)
![Cloudinary](https://img.shields.io/badge/Image%20Management-Cloudinary-lightblue?style=for-the-badge&logo=cloudinary)

---

## 🔗 Live Demo

🌐 [SnapStyle AI](https://snapstyle-ai.netlify.app)  

---

## 🛠️ Features

### 🎨 **Style Recommendations**
- Upload your favorite fashion inspiration image. 🖼️
- Get personalized style suggestions tailored to occasions like casual, formal, or party. 🛍️

### 🌦️ **Weather Integration**
- Provides weather-based recommendations. ☀️🌧️❄️

### 🛒 **Cart & Wishlist Management**
- Add items to your cart for instant purchase. 🛒
- Save your favorite styles in your wishlist to buy later. 💖

### 💳 **Stripe Payment Integration**
- Seamless payment processing with Stripe. 💳

### 🔑 **Authentication**
- Secure login and signup using Firebase Authentication. 🔐

### 🧵 **Responsive Design**
- Beautiful UI optimized for desktop, tablet, and mobile devices. 📱💻

---

## 🏗️ Tech Stack

### 🖼️ **Frontend**
- ![React](https://img.shields.io/badge/React.js-blue?style=flat-square&logo=react) **React.js**: Component-based architecture for building the user interface.
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-green?style=flat-square&logo=tailwindcss) **Tailwind CSS**: Modern styling with responsive design.
- **React Toastify**: Provides user-friendly notifications.

### ⚙️ **Backend**
- ![Node.js](https://img.shields.io/badge/Node.js-brightgreen?style=flat-square&logo=node.js) **Node.js**: Handles backend logic and server-side operations.
- ![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript) **TypeScript**: Enhances code quality with static typing.
- ![Netlify](https://img.shields.io/badge/Netlify_Functions-yellow?style=flat-square&logo=netlify) **Netlify Functions**: Manages serverless API endpoints.
- ![Stripe](https://img.shields.io/badge/Stripe-red?style=flat-square&logo=stripe) **Stripe API**: Secure and seamless payment processing.


### 🗄️ **Database**
- ![Firebase](https://img.shields.io/badge/Firebase-orange?style=flat-square&logo=firebase) **Firebase Firestore**: Efficient storage for cart and wishlist data.

### 🌐 **APIs & Services**
- ![OpenAI](https://img.shields.io/badge/OpenAI-black?style=flat-square&logo=openai) **OpenAI API**: Advanced AI capabilities for personalized recommendations.
- ![Azure](https://img.shields.io/badge/Azure-blue?style=flat-square&logo=microsoftazure) **Azure Services**: Fast and efficient image processing.
- ![Cloudinary](https://img.shields.io/badge/Cloudinary-lightblue?style=flat-square&logo=cloudinary) **Cloudinary**: Manages image storage and delivery.
- ![OpenCage](https://img.shields.io/badge/OpenCage-grey?style=flat-square&logo=geocaching) **OpenCage API**: Converts location data into geocoordinates for weather integration.
- ![WeatherData](https://img.shields.io/badge/Weather_API-blue?style=flat-square&logo=weather) **WeatherData API**: Provides real-time weather information for contextual style recommendations.


### 🌐 **Deployment**
- ![Netlify](https://img.shields.io/badge/Netlify-yellow?style=flat-square&logo=netlify) **Netlify**: Continuous Deployment and hosting.

### 🧠 **Custom AI Models**
- Utilizes advanced OpenAI models for analyzing user-uploaded images.
- Tailors style recommendations based on data from image analysis , occasion and weather.

---

## 🖼️ Screenshots

### Homepage
![Homepage](./public/screenshots/homepage.png)

### Results Page
![Results Page](./public/screenshots/Results.png)

### Wishlist
![Wishlist](./public/screenshots/Wishlist.png)

### Cart
![Cart](./public/screenshots/cart.png)

---

## 🔧 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Shikhararora19/snapstyle-ai.git
   ```

2. Navigate to the project directory:
   ```bash
   cd snapstyle-ai
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

5. Start the development server:
   ```bash
   npm start
   ```

6. Visit the app at `http://localhost:3000`.

---

## 🔌 API Endpoints

### 🔹 **/create-payment-intent**
- **Method**: POST
- **Description**: Creates a payment intent using Stripe.
- **Payload**:
  ```json
  {
    "amount": 1000,
    "currency": "usd"
  }
  ```

---

## 🚀 Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `/build` folder to Netlify.

3. Ensure the `_redirects` file is added to the `public` folder:
   ```plaintext
   /*    /index.html   200
   ```

---


## 🌟 Future Enhancements

- 🧠 **AI Integration**: Improve recommendations using advanced machine learning models.
- 🌐 **Multi-language Support**: Add support for more languages.
- 🛍️ **Order History**: Allow users to view past purchases.
- 📦 **Product Reviews**: Enable users to leave feedback on styles.

---

## 🛡️ Security

- Uses Firebase Authentication for secure user management.
- All payments processed securely through Stripe.

---

## 🤝 Contribution Guidelines

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

For inquiries or feedback, please reach out to:
- **Author**: Shikhar Arora
- **Email**: [shikhar3@ualberta.ca](mailto:shikhar3@ualberta.ca)
- **GitHub**: [Shikhararora19](https://github.com/Shikhararora19)

---

## ⭐ Acknowledgements

- Icons and illustrations by [Freepik](https://www.freepik.com).
- Styling powered by [Tailwind CSS](https://tailwindcss.com).
- Hosting and deployment via [Netlify](https://www.netlify.com).

Thank you for using SnapStyle AI! Let’s revolutionize the way we shop for fashion together! 🎉
