import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [files, setFiles] = useState<any>();

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!;
    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);

    const {
      data: { signedUrl, fields },
    } = await axios.get(
      `/api/project/upload-url?file=${filename}&fileType=${fileType}`
    );
    // const { url, fields } = await res.json();
    const formData = new FormData();

    // console.log(res);

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    //console.log({ formData, url });

    // const signedUrl =
    //   "https://sleekbbcs.s3.ap-southeast-1.amazonaws.com/prods-7%20%281%29.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA3QT42QTDZYAPZMGQ%2F20230520%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230520T054307Z&X-Amz-Expires=900&X-Amz-Signature=0744b0cf288edeeff00a1ee892372bad7a14e7ce41fe68a2a0ada5a06c488a0d&X-Amz-SignedHeaders=host&x-id=PutObject";

    await axios.put(signedUrl, formData);
    // .then((d) => {
    //   if (d.ok) {
    //     console.log("Uploaded successfully!");
    //   } else {
    //     console.error("Upload failed.");
    //   }
    // });
    // , {
    //   // method: "PUT",
    //   // body: formData,
    // });

    //Promise.all(res, upload);

    //setFiles(upload);
  };
  return (
    <>
      {JSON.stringify(files)}
      <p>Upload a .png or .jpg image (max 1MB).</p>
      <input
        onChange={uploadPhoto}
        type="file"
        accept="image/png, image/jpeg"
      />
    </>
  );
}
