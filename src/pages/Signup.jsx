import { Template } from "../components/core/auth/Template";
import signupImage from "../assets/Images/signup.webp";

export const Signup = () => {
  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      desc1="Learn to code — free 3,000-hour curriculum"
      desc2="Learn to code and gain a new skill with StudyNotion"
      image={signupImage}
      formType="signup"
    />
  );
};
