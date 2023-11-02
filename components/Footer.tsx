import { Container } from "./Containing";

export function Footer() {
  return (
    <footer className="my-4 mb-4">
      <Container>
        <p className="text-center text-lg">
          By Juan Almanza - This website is licensed under{" "}
          <a
            href="https://github.com/scidroid/home/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            GNU AGPLv3
          </a>{" "}
          - Open the console ;)
        </p>
      </Container>
    </footer>
  );
}
