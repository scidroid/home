import {
  Bold,
  Heading2,
  ImageWithCaption,
  InlineCode,
  Italic,
  Paragraph
} from "@/components/content";
import { CodeBlock } from "@/components/content/code-block";

import fetch from "@/public/images/apple-health/fetch.avif";
import post from "@/public/images/apple-health/post.avif";

const metadata = {
  slug: "apple-health",
  title: "Apple Health data in your website",
  date: "2023-11-08",
  summary:
    "Create a shortcut in the iPhone that send data from Apple Health to an endpoint in your website."
};

function Page() {
  return (
    <>
      <Paragraph>
        While Apple Health data is typically stored solely on the device and
        lacks an official API for data exposure, there are ways around this. In
        this guide, we'll explore a creative solution to this challenge by
        crafting a <Bold>custom API</Bold>. We'll use an{" "}
        <Bold>iPhone shortcut</Bold> to automate the process of fetching health
        data and sending it to an endpoint on your website.
      </Paragraph>

      <Heading2>Creating the shortcut</Heading2>

      <Paragraph>
        Let's begin creating the shortcut and retrieving health samples of a
        specific type. For this demonstration, we'll fetch the{" "}
        <Bold>heart rate</Bold>.
      </Paragraph>

      <Paragraph>
        The <InlineCode>Find Health Sample</InlineCode> action offers different
        options based on the metric you're seeking. In this case, let's select{" "}
        <InlineCode>Heart rate</InlineCode> with the condition{" "}
        <Italic>"is in the last 3 days"</Italic>, and create a variable to store
        the result, as shown in this screenshot:
      </Paragraph>

      <ImageWithCaption
        alt="Accessing the health data inside the shortcut."
        src={fetch}
        width={400}
        height={720}
      />

      <Paragraph>
        Next, the <InlineCode>Get Contents Of</InlineCode> action is triggered,
        which sends a request to our endpoint with the body of our POST request.
        The body of the request is a JSON object containing the current date,
        along with the <InlineCode>heart</InlineCode> field. This field
        references the <InlineCode>hrate</InlineCode> variable declared earlier.
        For the URL, you can add a search parameter with the password to prevent
        abuse of your database.
      </Paragraph>

      <ImageWithCaption
        alt="Sending the information to our endpoint."
        src={post}
        width={400}
        height={720}
      />

      <Heading2>Creating the API Endpoint</Heading2>

      <Paragraph>
        Once your shortcut is ready, the next step involves setting up your API
        endpoint. The code snippet below outlines the process for Next.js with
        Vercel KV but you are free to use the service you most like:
      </Paragraph>

      <Paragraph>
        Make sure to create a <InlineCode>.env</InlineCode> file and add the
        <InlineCode>PASSWORD</InlineCode> variable and the keys for the
        key-value service.
      </Paragraph>

      <CodeBlock language="typescript" filename="/api/health/route.ts">
        {`import { kv } from "@vercel/kv";

const { PASSWORD } = process.env;

export async function POST(request: Request) {
  const password = new URL(request.url).searchParams.get("password");

  if (password != PASSWORD) {
    return Response.json(
      {
        error: "incorrect password"
      },
      { status: 401 }
    );
  }

  const res = await request.json();

  await kv.set("health", res.value);

  return Response.json(data);
}`}
      </CodeBlock>

      <Heading2>Display the data using RSC</Heading2>

      <Paragraph>
        If you are using the Next.js app router or any other implementation of
        React Server Components you can directly fetch the Vercel KV service in
        the component.
      </Paragraph>

      <CodeBlock language="typescript">
        {`import { kv } from "@vercel/kv";

export async function HealthData() {
  const bpm = await kv.get("health");

  return <p>{bpm} BPM</p>;
}`}
      </CodeBlock>
    </>
  );
}

export const appleHealth = {
  metadata,
  Page
};
