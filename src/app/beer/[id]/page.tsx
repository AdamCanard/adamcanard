"use client";
import { useEffect, useState } from "react";

import { BeerData } from "../../types";
import BeerDisplay from "../../components/beerdisplay";

//Route here after clicking on Beer list element
export default function Page({ params }: { params: { id: string } }) {
  //assign the beer id to the beerData
  //unsure if this is neccesary

  const [beerData, setBeerData] = useState<BeerData>({} as BeerData);

  //store beerdata on beer by id
  const getData = async (formData: FormData) => {
    try {
      const response = await fetch("/api/getbeerbyid/", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .catch((err) => {
          console.error(err);
        });

      setBeerData(response);
    } catch (error) {
      console.log(error);
    }
  };

  //on render grab the beer data from the given beer id
  useEffect(() => {
    const formData = new FormData();
    formData.append("id", params.id);
    getData(formData);
  }, [params.id]);

  return (
    //setup beerdata context
    <BeerDisplay beerData={beerData} />
  );
}
