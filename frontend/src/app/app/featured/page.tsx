"use client";

import withAuth from "../../utils/withAuth";
import Nav from "../components/Nav"

const dummyData = [
  { school: "UC Irvine", building: "ISEB" },
  { school: "UC Irvine", building: "Science Library" },
  { school: "UC Irvine", building: "Gateway Study Center" },
  { school: "UC Irvine", building: "Student Center" },
  { school: "UC Irvine", building: "Langson Library" },
];

function Page() {
  return (
    <div>
      <Nav />
      {dummyData.map((e, key) => {
        return (
          <div key={key}>
            {e.school}: {e.building}
          </div>
        );
      })}
    </div>
  );
}

export default withAuth(Page);
