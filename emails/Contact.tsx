import { Container } from "@react-email/container";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Text } from "@react-email/text";

type Props = {
  name: string;
  message: string;
  email: string;
};

export function Contact({ name, message, email }: Props) {
  return (
    <Html lang="en">
      <Text>Hi {name}!</Text>
      <Text>
        Thank you for contacting me. I will get back to you as soon as possible.
      </Text>
      <Text>Your email: {email}</Text>
      <Text>Your message: {message}</Text>
      <Hr />
      <Container>
        <Text style={{ fontWeight: "bold" }}>Juan Almanza,</Text>
        <Text>hi@scidroid.co</Text>
      </Container>
    </Html>
  );
};