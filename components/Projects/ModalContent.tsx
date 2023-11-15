"use client";

import Image from "next/image";
import Link from "next/link";

import { getMDXComponent } from "next-contentlayer/hooks";

function CustomLink(props: any) {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a className="underline hover:no-underline" {...props} />;
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="underline hover:no-underline"
      {...props}
    />
  );
}

const components = {
  a: CustomLink,
  Image: Image
};

export function ModalContent({ content }: { content: string }) {
  const Content = getMDXComponent(content);

  return <Content components={components} />;
}
