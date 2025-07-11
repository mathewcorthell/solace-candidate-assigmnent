"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;

    document.getElementById("search-term").innerHTML = searchTerm;

    console.log("filtering advocates...");
    const minimumYears = parseInt(searchTerm);
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        // Assuming specified years of experience to be a minimum, not exact
        (isNaN(minimumYears) ? false : advocate.yearsOfExperience >= minimumYears)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr className="bg-blue-100">
            <th className="text-left px-5 py-1">Name</th>
            <th className="text-left px-5 py-1">City</th>
            <th className="text-left px-5 py-1">Degree</th>
            <th className="text-left px-5 text-left py-1">Specialties</th>
            <th className="text-left px-5 py-1">Years of Experience</th>
            <th className="text-left px-5 py-1">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, index) => {
            return (
              <tr key={advocate.id} className={(index % 2) == 0 ? "" : "bg-gray-100"}>
                <td className="align-top text-lg font-semibold px-5 py-1">{advocate.firstName} {advocate.lastName}</td>
                <td className="align-top px-5 py-1">{advocate.city}</td>
                <td className="align-top text-center px-5 py-1">{advocate.degree}</td>
                <td className="align-top text-sm px-5 py-1">
                  {advocate.specialties.map((s, sIndex) => (
                    <div key={sIndex}>{s}</div>
                  ))}
                </td>
                <td className="align-top text-center px-5 py-1">{advocate.yearsOfExperience}</td>
                <td className="align-top text-center px-5 py-1">{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
