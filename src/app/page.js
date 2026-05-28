"use client";

import { useEffect, useState } from "react";

import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaRegClock,
  FaSearch,
} from "react-icons/fa";

export default function Home() {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);

  const [profile, setProfile] = useState("");
  const [location, setLocation] = useState("");
  const [workFromHome, setWorkFromHome] = useState(false);
  const [partTime, setPartTime] = useState(false);
  const [stipend, setStipend] = useState(0);

  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const [jobOffer, setJobOffer] = useState(false);
  const [fastResponse, setFastResponse] = useState(false);
  const [earlyApplicant, setEarlyApplicant] = useState(false);
  const [womenInternships, setWomenInternships] = useState(false);
  const [activelyHiring, setActivelyHiring] = useState(false);
  
  const [startDate, setStartDate] = useState("");
  const [maxDuration, setMaxDuration] = useState("");

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetch("/data/internships.json")
      .then((res) => res.json())
      .then((data) => {
        setInternships(data);
        setFilteredInternships(data);
      });
  }, []);

  useEffect(() => {
    let filtered = internships;

    // START DATE
    if (startDate) {
      filtered = filtered.filter(
        (item) =>
          new Date(item.start_date) >= new Date(startDate)
      );
    }
    
    // PROFILE FILTER
    if (profile) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(profile.toLowerCase())
      );
    }

    // LOCATION FILTER
    if (location) {
      filtered = filtered.filter((item) =>
        item.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // WORK FROM HOME
    if (workFromHome) {
      filtered = filtered.filter((item) => item.work_from_home);
    }

    // PART TIME
    if (partTime) {
      filtered = filtered.filter((item) => item.part_time);
    }

    // STIPEND
    filtered = filtered.filter(
      (item) => item.stipend >= stipend
    );

    // KEYWORD SEARCH
    if (keyword) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(keyword.toLowerCase()) ||
          item.company.toLowerCase().includes(keyword.toLowerCase()) ||
          item.location.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    // MAX DURATION
    if (maxDuration) {
      filtered = filtered.filter(
        (item) =>
          parseInt(item.duration) <= parseInt(maxDuration)
      );
    }

    // JOB OFFER
    if (jobOffer) {
      filtered = filtered.filter(
        (item) => item.stipend >= 8000
      );
    }

    // FAST RESPONSE
    if (fastResponse) {
      filtered = filtered.filter(
        (item) => item.duration.includes("2")
      );
    }

    // EARLY APPLICANT
    if (earlyApplicant) {
      filtered = filtered.filter(
        (item) => item.stipend >= 5000
      );
    }

    // WOMEN INTERNSHIPS
    if (womenInternships) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes("design") ||
          item.title.toLowerCase().includes("marketing")
      );
    }

    // ACTIVELY HIRING
    if (activelyHiring) {
      filtered = filtered.filter(
        (item) => item.stipend >= 3000
      );
    }

    setFilteredInternships(filtered);

  }, [
    profile,
    location,
    workFromHome,
    partTime,
    stipend,
    keyword,
    maxDuration,
    startDate,
    jobOffer,
    fastResponse,
    earlyApplicant,
    womenInternships,
    activelyHiring,
    internships,
  ]);
    
  const clearFilters = () => {
    setProfile("");
    setLocation("");
    setWorkFromHome(false);
    setPartTime(false);
    setStipend(0);
    
    setJobOffer(false);
    setFastResponse(false);
    setEarlyApplicant(false);
    setWomenInternships(false);
    setActivelyHiring(false);
    
    setStartDate("");
    setMaxDuration("");

    setKeyword("");
  };

  return (
    <div className="bg-[#F8F8F8] min-h-screen">
      {/* NAVBAR */}

      <nav className="bg-white border-b border-[#E5E7EB] h-[68px] flex items-center">
        <div className="max-w-[1180px] mx-auto px-4 w-full flex justify-between items-center">
          <img
            src="https://internshala.com/static/images/common/new_internshala_logo.svg"
            alt="logo"
            className="w-[115px]"
          />

          <div className="flex items-center gap-8 text-[14px] text-[#333]">
            <p className="hover:text-[#38BDF8] cursor-pointer transition">Internships</p>
            <p className="hover:text-[#38BDF8] cursor-pointer transition">Courses</p>
            <p className="hover:text-[#38BDF8] cursor-pointer transition">Jobs</p>

            <button className="bg-[#00A5EC] text-white px-4 py-1.5 rounded-md text-[13px] font-medium hover:bg-[#0088c3] cursor-pointer transition">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN */}

      <div className="max-w-[1180px] mx-auto flex gap-5 px-4 py-7 items-start">
        {/* FILTERS */}

        <div className="w-[255px] sticky top-24 self-start">
          <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-5">
            <h2 className="text-[16px] font-semibold text-center mb-5 text-[#333]">
              Filters
            </h2>

            {/* PROFILE */}

            <div className="mb-5">
              <label className="text-[13px] font-medium text-[#333]">
                Profile
              </label>

              <input
                type="text"
                placeholder="e.g. Marketing"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                className="w-full mt-2 border border-[#D1D5DB] rounded-md px-3 py-2 text-[13px] outline-none"
              />
            </div>

            {/* LOCATION */}

            <div className="mb-5">
              <label className="text-[13px] font-medium text-[#333]">
                Location
              </label>

              <input
                type="text"
                placeholder="e.g. Delhi"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full mt-2 border border-[#D1D5DB] rounded-md px-3 py-2 text-[13px] outline-none"
              />
            </div>

            {/* CHECKBOX */}

            <div className="space-y-3 mb-5">
              <label className="flex items-center gap-3 text-[13px] text-[#333]">
                <input
                  type="checkbox"
                  checked={workFromHome}
                  onChange={() => setWorkFromHome(!workFromHome)}
                  className="w-4 h-4"
                />
                Work from home
              </label>

              <label className="flex items-center gap-3 text-[13px] text-[#333]">
                <input
                  type="checkbox"
                  checked={partTime}
                  onChange={() => setPartTime(!partTime)}
                  className="w-4 h-4"
                />
                Part-time
              </label>
            </div>

            {/* STIPEND */}

            <div className="mb-5">
              <p className="text-[13px] font-medium mb-3 text-[#333]">
                Desired minimum monthly stipend (₹)
              </p>

              <input
                type="range"
                min="0"
                max="10000"
                step="2000"
                value={stipend}
                onChange={(e) => setStipend(Number(e.target.value))}
                className="w-full accent-[#00A5EC]"
              />

              <div className="flex justify-between text-[11px] text-[#6B7280] mt-2">
                <span>0</span>
                <span>2K</span>
                <span>4K</span>
                <span>6K</span>
                <span>8K</span>
                <span>10K</span>
              </div>
            </div>

            {/* VIEW MORE */}

            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="text-[#008BDC] text-[13px] font-medium"
            >
              {showMoreFilters
                ? "View less filters ▲"
                : "View more filters ▼"}
            </button>

            {/* MORE FILTERS */}

            {showMoreFilters && (
              <div className="mt-5 space-y-4">

                <div>
                  <p className="text-[13px] font-medium mb-2 text-[#333]">
                    Starting from (or after)
                  </p>

                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border border-[#d1d5db] rounded-md px-4 py-3 text-[14px] outline-none bg-white"
                  />
                </div>

                <div>
                  <p className="text-[13px] font-medium mb-2 text-[#333]">
                    Max. duration (months)
                  </p>

                  <select
                    value={maxDuration}
                    onChange={(e) => setMaxDuration(e.target.value)}
                    placeholder="Choose duration"
                    className="w-full border border-[#d1d5db] rounded-md px-4 py-3 text-[14px] outline-none bg-white"
                  >
                    <option value="">Choose Duration</option>
                    <option value="1">1 month</option>
                    <option value="2">2 months</option>
                    <option value="3">3 months</option>
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                    <option value="24">24 months</option>
                    <option value="36">36 months</option>
                  </select>
                </div>
                
                <div className="space-y-3 pt-1">
                  
                  <label className="flex items-center gap-3 text-[13px] text-[#333]">
                    <input
                      type="checkbox"
                      checked={jobOffer}
                      onChange={() => setJobOffer(!jobOffer)}
                      className="w-4 h-4"
                    />
                    Internships with job offer
                  </label>
                  
                  <label className="flex items-center gap-3 text-[13px] text-[#333]">
                    <input
                      type="checkbox"
                      checked={fastResponse}
                      onChange={() => setFastResponse(!fastResponse)}
                      className="w-4 h-4"
                    />
                    Fast response
                  </label>
                  
                  <label className="flex items-center gap-3 text-[13px] text-[#333]">
                    <input
                      type="checkbox"
                      checked={earlyApplicant}
                      onChange={() => setEarlyApplicant(!earlyApplicant)}
                      className="w-4 h-4"
                    />
                    Early applicant
                  </label>
                  
                  <label className="flex items-center gap-3 text-[13px] text-[#333]">
                    <input
                      type="checkbox"
                      checked={womenInternships}
                      onChange={() => setWomenInternships(!womenInternships)}
                      className="w-4 h-4"
                    />
                    Internships for women
                  </label>
                  
                  <label className="flex items-center gap-3 text-[13px] text-[#333]">
                    <input
                      type="checkbox"
                      checked={activelyHiring}
                      onChange={() => setActivelyHiring(!activelyHiring)}
                      className="w-4 h-4"
                    />
                    Actively hiring
                  </label>
                  
                </div>
              </div>
            )}

            {/* CLEAR */}

            <div className="flex justify-end mt-5">
              <button
                onClick={clearFilters}
                className="text-[#008BDC] text-[13px]"
              >
                Clear all
              </button>
            </div>
          </div>

          {/* SEARCH */}

          <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-4 mt-4">
            <h2 className="text-[16px] font-semibold text-center mb-4 text-[#333]">
              Keyword Search
            </h2>
            
            <div className="flex">
              <input
                type="text"
                placeholder="e.g. Design, Mumbai"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-1 border border-[#D1D5DB] rounded-l-md px-3 py-2 text-[13px] outline-none"
              />
              
              <button className="bg-[#00A5EC] text-white px-4 rounded-r-md text-[13px] flex items-center justify-center">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex-1">
          <h1 className="text-[32px] font-bold text-[#1E293B]">
            {filteredInternships.length} Total Internships
          </h1>

          <p className="text-[#6B7280] text-[15px] mt-1 mb-5">
            Latest Summer Internships in India
          </p>

          <div className="space-y-4">
            {filteredInternships.length === 0 && (
              <div className="bg-white border border-[#E5E7EB] rounded-[10px] p-10 text-center">

                <h2 className="text-[22px] font-semibold text-gray-700">
                  No internships found
                </h2>

                <p className="text-gray-500 mt-2">
                  Try changing filters or keyword search
                </p>

              </div>
            )}

            {filteredInternships.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E5E7EB] rounded-[10px] p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h2 className="text-[18px] font-semibold text-[#1F2937]">
                      {item.title}
                    </h2>

                    <p className="text-[#6B7280] text-[14px] mt-1">
                      {item.company}
                    </p>

                    <div className="flex flex-wrap gap-5 mt-3 text-[13px] text-[#4B5563]">

                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-[#8A8A8A] text-[12px]" />
                        <p>{item.location}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-[#8A8A8A] text-[12px]" />
                        <p>₹ {item.stipend.toLocaleString()}/month</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <FaRegClock className="text-[#8A8A8A] text-[12px]" />
                        <p>{item.duration}</p>
                      </div>

                    </div>

                    <div className="flex gap-3 mt-4">
                      <button className="bg-[#E8F8EE] text-green-700 px-3 py-1 rounded-full text-[12px]">
                        Actively hiring
                      </button>

                      <button className="bg-[#FFF4E5] text-[#C77700] px-3 py-1 rounded-full text-[12px] cursor-pointer transition hover:bg-[#ffe0b2]">
                        Apply now
                      </button>
                    </div>
                  </div>

                  <div className="w-12 h-12 bg-[#F3F4F6] rounded-xl flex items-center justify-center text-lg">
                    🏢
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="bg-[#0F172A] text-white mt-10">

        <div className="max-w-[1180px] mx-auto px-4 py-10">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {/* INTERNSHIPS */}

            <div>
              <h3 className="font-semibold mb-4 text-[16px] text-white">
                Internships
              </h3>

              <div className="space-y-3 text-[14px] text-gray-300">

                <p className="hover:text-[#38BDF8] cursor-pointer transition">
                  Internship in India
                </p>

                <p className="hover:text-[#38BDF8] cursor-pointer transition">
                  Internship in Bangalore
                </p>

                <p className="hover:text-[#38BDF8] cursor-pointer transition">
                  Internship in Delhi
                </p>

                <p className="hover:text-[#38BDF8] cursor-pointer transition">
                  Virtual Internship
                </p>

              </div>
            </div>

            {/* JOBS */}

            <div>
              <h3 className="font-semibold mb-4 text-[16px] text-white">
                Jobs
              </h3>

              <div className="space-y-3 text-[14px] text-gray-300">

                <p className="hover:text-[#38BDF8] cursor-pointer transition">
                  Fresher Jobs
                </p>

                <p className="hover:text-[#38BDF8] cursor-pointer transition">
                  Marketing Jobs
                </p>

                <p className="hover:text-[#38BDF8] cursor-pointer transition">
                  Engineering Jobs
                </p>

                <p className="hover:text-[#38BDF8] cursor-pointer transition">
                  Remote Jobs
                </p>

              </div>
            </div>

            {/* COURSES */}

            <div>
              <h3 className="font-semibold mb-4 text-[16px] text-white">
                Courses
              </h3>

              <div className="space-y-3 text-[14px] text-gray-300">

                <p className="hover:text-[#38BDF8] cursor-pointer transition">
                  Web Development
                </p>

                <p className="hover:text-[#38BDF8] cursor-pointer transition">
                  Machine Learning
                </p>

                <p className="hover:text-[#38BDF8] cursor-pointer transition">
                  Python
                </p>

                <p className="hover:text-[#38BDF8] cursor-pointer transition">
                  Digital Marketing
                </p>

              </div>
            </div>

            {/* CONTACT */}

            <div>
              <h3 className="font-semibold mb-4 text-[16px] text-white">
                Contact
              </h3>

              <div className="space-y-3 text-[14px] text-gray-300">

                <p className="hover:text-[#38BDF8] cursor-pointer transition">
                  help@internshala.com
                </p>

                <p className="hover:text-[#38BDF8] cursor-pointer transition">
                  +91 9999999999
                </p>

                <p className="hover:text-[#38BDF8] cursor-pointer transition">
                  New Delhi, India
                </p>

              </div>
            </div>

          </div>

          {/* COPYRIGHT */}

          <div className="border-t border-[#334155] mt-10 pt-5 text-center text-[13px] text-gray-400">
            © 2026 Internshala Clone. All rights reserved.
          </div>

        </div>

      </footer>
    </div>
  );
}