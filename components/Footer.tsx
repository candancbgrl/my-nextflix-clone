import React from "react";

const footerList = [
  [
    "FAQ",
    "Investor Relations",
    "Ways to Watch",
    "Corporate Information",
    "Netflix Originals",
  ],
  ["Help Center", "Jobs", "Terms of Use", "Contact Us"],
  ["Account", "Gift Cards", "Privacy", "Speed Test"],
  ["Media Center", "Buy Gift Cards", "Cookie Prefences", "Legal Notices"],
];

const Footer = () => {
  return (
    <>
      <hr className="mt-16 pt-12 border-zinc-500" />
      <img src="/images/N.png" className=" ml-12 w-36 h-20" />
      <div className="text-2xl text-zinc-600 mb-12 px-24">
        Quesions? Call 1-844-505-2993
      </div>
      <div className="flex flex-row gap-28 px-24 pb-24 ">
        {footerList.map((innerArray, index) => (
          <div key={index} className="w-1/4 flex flex-col gap-3">
            {innerArray.map((item) => (
              <div className="text-zinc-600 text-lg">{item}</div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Footer;
