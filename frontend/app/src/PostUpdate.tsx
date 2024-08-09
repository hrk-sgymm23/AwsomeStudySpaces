import "./App.css";
import React, { useEffect, useState, useCallback } from "react";
import client from "./lib/api/client";
import { useDropzone } from "react-dropzone";
import Header from "./components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuthHeaders } from "./lib/api/auth";

interface FormData {
  title: string;
  description: string;
  address: string;
  location_image: File | null;
}

interface currentId {
  id: number;
}

const PostUpdate: React.FC = () => {
  const Location = useLocation();
  const navigation = useNavigate();

  const { id } = Location.state as currentId;
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    address: "",
    description: "",
    location_image: null,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // TODO: 画像は一枚のため、map処理は必要ない
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpg", ".jpeg"],
    },
  });

  useEffect(() => {
    client
      .get<FormData>(`/location_posts/${id}`)
      .then((response) => {
        const responseData = response.data;
        setFormData(responseData);
      })
      .catch((error) => {
        console.error("HTTPリクエストエラー:", error);
        setError(error.message);
      });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const deleteHandler = () => {
    setFormData({
      title: "",
      address: "",
      description: "",
      location_image: null,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const requestData = new FormData();
      requestData.append("location_post[title]", formData.title);
      requestData.append("location_post[description]", formData.description);
      requestData.append("location_post[address]", formData.address);
      if (files[0]) {
        requestData.append("location_post[location_image]", files[0]);
      }
      const authHeaders = { headers: getAuthHeaders() };

      const response = await client.put(
        `/location_posts/${id}`,
        requestData,
        authHeaders,
      );
      if (response.status === 200) {
        console.log("LocationPost Update request successful:", response.data);
        navigation("/LocationPosts");
      }
    } catch (error) {
      console.error("POST request failed:", error);
      deleteHandler();
    }
  };

  const moveRecession = () => {
    navigation(-1);
  };

  return (
    <div>
      <Header />
      <h1
        className="
                font-bold
                text-3xl
        "
      >
        PostUpdate
      </h1>
      <form onSubmit={handleSubmit}>
        <div
          className="
                    p-4
                    font-bold
                    text-xl
            "
        >
          <label>タイトル</label>
          <br />
          <input
            className="
                        p-2
                        border-solid
                        border-2
                        border-sky-500
                        rounded-lg
                    "
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div
          className="
                p-4
                font-bold
                text-xl
            "
        >
          <label>場所</label>
          <br />
          <input
            className="
                        p-2
                        border-solid
                        border-2
                        border-sky-500
                        rounded-lg
                    "
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div
          className="
                p-4
                font-bold
                text-xl
            "
        >
          <label>詳細文</label>
          <br />
          <textarea
            className="
                        p-2
                        border-solid
                        border-2
                        border-sky-500
                        rounded-lg
                        h-72
                        w-72
                        text-balance
                    "
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div
          className="
                p-4
                font-bold
                text-xl
            "
        >
          <label>画像選択</label>
          <br />
        </div>
        {!formData.location_image && files.length === 0 && (
          <div
            className="
                    flex
                    justify-center
                    items-center
                    h-72
                "
          >
            <div
              {...getRootProps()}
              className="
                            flex
                            justify-center
                            items-center
                            w-72
                            h-72
                            border-solid
                            border-2
                            p-10
                            rounded-lg
                    "
            >
              <input {...getInputProps()} />
              <p>
                ここにファイルをドラッグ&ドロップまたは
                <br />
                クリックしてファイルを選択してください。
                <br />
                ※画像は一枚のみ選択可能
              </p>
              <br />
            </div>
          </div>
        )}
        {error && <p>{error}</p>}

        <div
          className="
                flex
                justify-center
                items-center
            "
        >
          {files && formData.location_image && (
            <img
              src={"http://localhost:3001/" + formData.location_image}
              alt="location_image"
              style={{ maxWidth: "300px", maxHeight: "300px", margin: "5px" }}
            />
          )}
        </div>
        <div
          className="
                flex
                justify-center
                items-center
            "
        >
          {files.map((file) => {
            if (file.type.startsWith("image/")) {
              return (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  key={file.name}
                  style={{
                    maxWidth: "300px",
                    maxHeight: "300px",
                    margin: "5px",
                  }}
                />
              );
            }
            if (file.type === "application/pdf") {
              return (
                <iframe
                  src={URL.createObjectURL(file)}
                  title={file.name}
                  key={file.name}
                  style={{
                    maxWidth: "300px",
                    maxHeight: "300px",
                    margin: "5px",
                  }}
                />
              );
            }
            return null;
          })}
        </div>

        {formData.location_image && (
          <div>
            <button
              className="
                        m-2
                        border-solid
                        border-2
                        border-sky-500
                        font-bold
                        text-xl
                        rounded-2xl
                        p-2
                    "
              type="button"
              onClick={() =>
                setFormData((prevState) => ({
                  ...prevState,
                  location_image: null,
                }))
              }
            >
              画像を削除
            </button>
          </div>
        )}

        <button
          className="
                    m-2
                    border-solid
                    border-2
                    border-sky-500
                    font-bold
                    text-xl
                    rounded-2xl
                    p-2
            "
          type="submit"
        >
          送信
        </button>
        <br />
        <button
          className="
                    m-2
                    border-solid
                    border-2
                    border-sky-500
                    font-bold
                    text-xl
                    rounded-2xl
                    p-2
                "
          type="button"
          onClick={deleteHandler}
        >
          入力リセット
        </button>
        <br />
        <button
          className="
                    m-2
                    border-solid
                    border-2
                    border-sky-500
                    font-bold
                    text-xl
                    rounded-2xl
                    p-2
                "
          type="button"
          onClick={moveRecession}
        >
          もどる
        </button>
      </form>
    </div>
  );
};

export default PostUpdate;
