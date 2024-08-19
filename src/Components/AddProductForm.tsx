import React, { useCallback, useEffect, useState } from "react";
import HeadersComp from "./Headers";
import Input from "./Inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextAreaInput from "./Inputs/TextAreaInput";
import CheckBox from "./Inputs/CheckBox";
import { Categories } from "../Utils/Categoriies";
import AdminCategories from "../Main/Categories/AdminCategories";
import { colors } from "../Utils/Colors";
import SelectColor from "./Inputs/SelectColor";
import ButtonComp from "./Button";
import toast from "react-hot-toast";
import { db, storage } from "../Firebase/FirebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};
export type SelectedImageType = {
  color: string;
  colorCode: string;
  image: File;
};

const AddProductForm = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      brand: "",
      category: "",
      description: "",
      prevPrice: "",
      price: "",
      images: [],
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  useEffect(() => {
    setCustomValue("images", images);
  }, [images, setCustomValue]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setIsProductCreated(false);
    }
  }, [isProductCreated, reset]);

  const category = watch("category");

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }

      return [...prev, value];
    });
  }, []);
  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (image) => image.color !== value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //   } else {
    //     toast.error("Login to create a product");
    //   }
    // });
    if (!data.category) {
      setLoading(false);
      return toast.error("Category cannot is empty");
    }

    if (!data.images || data.images.length === 0) {
      setLoading(false);
      return toast.error("Images cannot be empty");
    }

    const uploadedImage: any = [];
    const handleImageUpload = async () => {
      toast("Creating product please wait...");

      try {
        for (const item of data.images) {
          console.log("item", item);
          if (item.image) {
            const fileName = new Date().getTime() + "_" + item.image.name;
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log(progress);

                  switch (snapshot.state) {
                    case "paused":
                      console.log("upload paused");
                      break;
                    case "running":
                      console.log("upload running");
                      break;
                  }
                },
                (error) => {
                  reject(error);
                  console.log("error uploading the file", error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref).then(
                    (downloadURL) => {
                      console.log(downloadURL);
                      uploadedImage.push({ ...item, image: downloadURL });
                      resolve();
                    }
                  );
                }
              );
            });
          }
        }
      } catch (error) {
        setLoading(false);
        toast("Error uploading the images");
      }
    };

    try {
      await handleImageUpload();
      const productData = {
        ...data,
        images: uploadedImage,
        name: data.name,
        description: data.description,
        brand: data.brand,
        price: data.price,
        category: data.category,
        prevPrice: data.price,
      };

      const docRef = await addDoc(collection(db, "products"), {
        ...productData,
        name: productData.name,
        brand: productData.brand,
        category: productData.category,
        description: productData.description,
        prevPrice: productData.prevPrice,
        price: productData.price,
        images: productData.images,
      });

      console.log("Database ref is", docRef.id);
      setIsProductCreated(true);
      toast("Created the product successfully!");
    } catch (error) {
      console.log("Error uploading data to database", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeadersComp label="Add Product" />

      <div className="min-w-full flex flex-col gap-4">
        <Input
          label="Name"
          id="name"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
        <Input
          label="Brand"
          id="brand"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
        <Input
          label="Price"
          id="price"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
        <Input
          label="Prev price"
          id="prevPrice"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />

        <TextAreaInput
          label="Description"
          id="description"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />

        <CheckBox
          label="is product in stock"
          id="checkbox"
          register={register}
        />

        <div className="w-full flex flex-col gap-2 font-medium">
          <div className=" font-semibold">Select a category</div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 max-h-50vh overflow-y-auto">
            {Categories.map((item) => {
              if (item.label === "all") {
                return;
              }
              return (
                <div key={item.label} className="col-span">
                  <AdminCategories
                    label={item.label}
                    icon={item.icon}
                    onClick={(category) => setCustomValue("category", category)}
                    selected={category === item.label.toLowerCase()}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full flex flex-col gap-3 flex-wrap ">
          <div className="font-semibold">
            Select a color and choose an image
          </div>
          <div className="text-sm">
            *Ensure to upload an image for each color select otherwise your
            color select will be ignored
          </div>
          <div className="grid grid-cols-2 gap-3">
            {colors.map((item, index) => {
              return (
                <SelectColor
                  key={item.colorCode}
                  item={item}
                  addImageToState={addImageToState}
                  removeImageFromState={removeImageFromState}
                  isProductCreated={isProductCreated}
                />
              );
            })}
          </div>
        </div>
      </div>

      <ButtonComp
        label={loading ? "Loading..." : "add Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
