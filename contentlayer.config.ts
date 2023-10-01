import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Reading = defineDocumentType(() => ({
  name: "Reading",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    summary: { type: "string", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "readings",
  documentTypes: [Reading],
  disableImportAliasWarning: true
});
