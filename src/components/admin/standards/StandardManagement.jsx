import { useEffect, useState } from "react";
import React from "react";
import FetchService from "../../../services/FetchService";
import StandardElement from "./StandardElement";
import "./standards.css";

export default function StandardManagement() {
  const [standards, setStandards] = useState([]);

  useEffect(() => {
    FetchService.fetch(
      "/standards/withsectionscourses",
      "GET",
      "application/json",
      (data) => {
        setStandards(data);
      }
    );
  }, []);

  return (
    <div className="container my-5 p-3" id="accordion">
      {standards.map((block) => (
        <StandardElement standard={block} />
      ))}
    </div>
  );
}
