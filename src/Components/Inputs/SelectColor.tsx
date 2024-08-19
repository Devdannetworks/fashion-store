import React, { useCallback, useEffect, useState } from "react";
import { ImageType } from "../AddProductForm";
import SelectImage from "./SelectImage";
import ButtonComp from "../Button";
import { TruncateText } from "../../Actions/ExportedFunctions/Functions";

interface SelectColorProps {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
}

const SelectColor: React.FC<SelectColorProps> = ({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}) => {
  const [selected, setIsSelected] = useState(false);
  const [File, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (isProductCreated) {
      setFile(null);
      setIsSelected(false);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback(
    (value: File) => {
      setFile(value);
      addImageToState({ ...item, image: value });
    },
    [addImageToState, item]
  );

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsSelected(e.target.checked);

      if (!e.target.value) {
        setFile(null);
        removeImageFromState(item);
      }
    },
    [item, removeImageFromState]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto border-[1.2px] border-slate-200 items-center p-2">
      <div className="flex flex-row gap-2 items-center h-[60px]">
        <input
          id={item.color}
          type="checkbox"
          checked={selected}
          onChange={handleCheck}
          className="cursor-pointer"
        />
        <label className="font-medium cursor-pointer">{item.color}</label>
      </div>
      <>
        {selected && !File && (
          <div className="col-span-2 text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}
        {File && (
          <div className="flex flex-col md:flex-row gap-2 text-sm col-span-2 items-start md:items-center justify-between">
            <div>{TruncateText(File.name)}</div>
            <div className="w-[70px]">
              <ButtonComp
                label="Cancel"
                small
                outline
                onClick={() => {
                  setFile(null);
                  removeImageFromState(item);
                }}
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default SelectColor;
