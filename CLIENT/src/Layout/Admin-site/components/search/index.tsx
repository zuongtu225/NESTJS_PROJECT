import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import { AppDispatch } from "../../../../store";
import { useDispatch } from "react-redux";
import { Search } from "../../../../Interface";
import { getApiProducts, getApiUsers } from "../../../../store/action";

const SearchComponent: React.FC<Search> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("");
  useEffect(() => {
    switch (props.slug) {
      case "PRODUCTS":
        dispatch(getApiProducts({ data: value }));
        break;
      case "USERS":
        dispatch(getApiUsers({ data: value }));
        break;
      // case "manager-brand":
      //   dispatch(GetBrand({ title: value }));
      //   break;
      // case "manager-category":
      //   dispatch(GetCategory({ title: value }));
      //   break;
      // case "manager-color":
      //   dispatch(GetColor({ color: value }));
      //   break;
      // case "manager-ram":
      //   dispatch(GetRam({ size: value }));
      //   break;
      // case "manager-capacity":
      //   dispatch(GetCapacity({ size: value }));
      //   break;
      // default:
      //   break;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="w-full md:w-100">
      <Input
        label="Search"
        value={value}
        crossOrigin={undefined}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchComponent;
