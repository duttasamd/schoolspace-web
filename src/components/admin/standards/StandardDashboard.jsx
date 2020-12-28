import React, { useState } from "react";
import CourseList from "./CourseList";
import SectionList from "./SectionList";
import StandardList from "./StandardList";
import "./standards.css";


export default function StandardDashboard() {
	const [standard, setStandard] = useState(-1);
	const [section, setSection] = useState(-1);
	 
	return (
		<div>
		{standard === -1 && <StandardList setStandard={setStandard}/>}
		{standard > 0 && section === -1 && <SectionList standard_id={standard} setStandard={setStandard} setSection={setSection}/>}
		{standard > 0 && section > 0 && <CourseList section_id={section} setSection={setSection}/>}
		</div>
	);
}
