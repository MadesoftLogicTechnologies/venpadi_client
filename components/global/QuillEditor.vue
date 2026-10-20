<template>
  <div>
    <ClientOnly>
      <QuillEditor
        v-model:content="content"
        content-type="html"
        theme="snow"
        :toolbar="toolbarOptions"
        :modules="modules"
      />
    </ClientOnly>
  </div>
</template>
<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import BlotFormatter from "quill-blot-formatter/dist/BlotFormatter";
import ImageUploader from "quill-image-uploader";
const config = useRuntimeConfig();
const url = `${config.public.API_URL}/upload/file`;
const emit = defineEmits(["change-tab"]);
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  ["link", "image"],

  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],

  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ["clean"],
];
const modules = [
  {
    name: "blotFormatter",
    module: BlotFormatter,
    options: {},
  },
  {
    name: "imageUploader",
    module: ImageUploader,
    options: {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("file", file);
          const accessToken = localStorage.getItem("token");

          fetch(url, {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Upload failed");
              }
              return response.json();
            })
            .then((data) => {
              resolve(data.data.url);
            })
            .catch((error) => {
              reject("Upload failed");
            });
        });
      },
    },
  },
];

const props = defineProps({
  oldValue: String,
});

const content = ref(null);

watch(content, (newContent, oldContent) => {
  emit("contentChange", newContent);
  console.log(content.value);
});

setTimeout(() => {
  if (props.oldValue !== null) {
    content.value = props.oldValue;
  }
}, 200);
</script>
<style scoped lang="css">
:deep(.ql-editor) {
  min-height: 200px;
}
:deep(.ql-toolbar.ql-snow) {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
:deep(.ql-container.ql-snow) {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
