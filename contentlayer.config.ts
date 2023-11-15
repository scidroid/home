import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

export const Reading = defineDocumentType(() => ({
  name: "Reading",
  filePathPattern: `readings/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    summary: { type: "string", required: true }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: doc => doc._raw.sourceFileName.split(".")[0]
    }
  }
}));

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string", required: true },
    image: { type: "string", required: true },
    alt: { type: "string", required: true }
  },
  computedFields: {
    id: {
      type: "string",
      resolve: doc => doc._raw.sourceFileName.split(".")[0]
    }
  }
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Reading, Project],
  disableImportAliasWarning: true,
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro"
        }
      ]
    ]
  }
});
