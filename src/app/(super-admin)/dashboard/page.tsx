"use client";
import useViewport from "@/utils/view_port";
import { Users } from "lucide-react";
import dynamic from "next/dynamic";
import { useState, useEffect, useMemo } from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="h-[250px] sm:h-[350px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  ),
});

const clubData = {
  ClubsActivity: [
    { name: "photo_club", value: 8, displayName: "Photo Club" },
    { name: "bangla_club", value: 9, displayName: "Bangla Club" },
    { name: "science_club", value: 9, displayName: "Science Club" },
    { name: "drama_club", value: 4, displayName: "Drama Club" },
    { name: "sports_club", value: 11, displayName: "Sports Club" },
    { name: "art_club", value: 5, displayName: "Art Club" },
    { name: "math_club", value: 7, displayName: "Math Club" },
    { name: "history_club", value: 3, displayName: "History Club" },
  ],
  MostLikeClub: [
    { name: "science_club", value: 13, displayName: "Science Club" },
    { name: "art_club", value: 8, displayName: "Art Club" },
    { name: "drama_club", value: 6, displayName: "Drama Club" },
    { name: "sports_club", value: 15, displayName: "Sports Club" },
    { name: "photo_club", value: 7, displayName: "Photo Club" },
    { name: "math_club", value: 11, displayName: "Math Club" },
    { name: "history_club", value: 4, displayName: "History Club" },
    { name: "bangla_club", value: 3, displayName: "Bangla Club" },
  ],
  Users: {
    students: 40,
    users: 48,
    admins: 4,
    super_admins: 4,
  },
};

export default function Dashboard() {
  const [width] = useViewport();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const topClubs = useMemo(
    () => clubData.ClubsActivity.sort((a, b) => b.value - a.value).slice(0, 8),
    []
  );
  const topLikedClubs = useMemo(
    () => clubData.MostLikeClub.sort((a, b) => b.value - a.value).slice(0, 8),
    []
  );

  const userStats = [
    {
      name: "Students",
      value: clubData.Users.students,
      icon: Users,
    },
    {
      name: "Total Users",
      value: clubData.Users.users,
      icon: Users,
    },
    {
      name: "Admins",
      value: clubData.Users.admins,
      icon: Users,
    },
    {
      name: "Super Admins",
      value: clubData.Users.super_admins,
      icon: Users,
    },
  ];

  const activityChartOptions = useMemo(
    () => ({
      chart: {
        type: "area" as const,
        height: width < 640 ? 250 : 350,
        background: "transparent",
        toolbar: { show: false },
        animations: { enabled: true, easing: "easeinout", speed: 300 },
      },
      colors: ["#3b82f6", "#1d4ed8"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100],
        },
      },
      stroke: { curve: "smooth" as const, width: 3 },
      grid: { borderColor: "#e0e7ff", strokeDashArray: 3 },
      xaxis: {
        categories: clubData.ClubsActivity.map((club) => club.displayName),
        labels: {
          style: {
            colors: "#3b82f6",
            fontSize: width < 640 ? "10px" : "12px",
          },
          rotate: width < 640 ? -90 : -45,
        },
      },
      yaxis: { labels: { style: { colors: "#3b82f6" } } },
      tooltip: { theme: "light", style: { fontSize: "12px" } },
      dataLabels: { enabled: false },
    }),
    [width]
  );

  const popularityChartOptions = useMemo(
    () => ({
      chart: {
        type: "radialBar" as const,
        height: width < 640 ? 250 : 350,
        background: "transparent",
        animations: { enabled: true, easing: "easeinout", speed: 300 },
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: { margin: 5, size: "30%", background: "transparent" },
          dataLabels: {
            name: { show: false },
            value: {
              show: true,
              fontSize: width < 640 ? "14px" : "16px",
              fontWeight: 600,
              color: "#3b82f6",
            },
          },
        },
      },
      colors: ["#3b82f6", "#1d4ed8", "#1e40af", "#1e3a8a", "#172554"],
      labels: topLikedClubs.slice(0, 5).map((club) => club.displayName),
      legend: {
        show: true,
        floating: true,
        fontSize: width < 640 ? "10px" : "12px",
        position: width < 640 ? ("bottom" as const) : ("left" as const),
        offsetY: width < 640 ? 0 : 10,
        labels: { colors: "#3b82f6" },
        markers: { size: 0 },
        formatter: (seriesName: string, opts: any) =>
          seriesName + ": " + opts.w.globals.series[opts.seriesIndex],
        itemMargin: { vertical: 3 },
      },
    }),
    [topLikedClubs, width]
  );

  const trendsChartOptions = useMemo(
    () => ({
      chart: {
        type: "line" as const,
        height: width < 640 ? 300 : 400,
        background: "transparent",
        toolbar: { show: false },
        animations: { enabled: true, easing: "easeinout", speed: 300 },
      },
      colors: ["#3b82f6", "#1d4ed8"],
      stroke: { curve: "smooth" as const, width: 4 },
      grid: { borderColor: "#e0e7ff", strokeDashArray: 3 },
      markers: {
        size: 6,
        colors: ["#3b82f6", "#1d4ed8"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: { size: 8 },
      },
      xaxis: {
        categories: clubData.ClubsActivity.map((club) => club.displayName),
        labels: {
          style: {
            colors: "#3b82f6",
            fontSize: width < 640 ? "10px" : "12px",
          },
          rotate: width < 640 ? -90 : -45,
        },
      },
      yaxis: { labels: { style: { colors: "#3b82f6" } } },
      tooltip: { theme: "light", style: { fontSize: "12px" } },
      legend: {
        position: "top" as const,
        horizontalAlign: "right" as const,
        labels: { colors: "#3b82f6" },
      },
    }),
    [width]
  );

  const donutOptions = useMemo(
    () => ({
      chart: {
        type: "donut" as const,
        height: width < 640 ? 250 : 350,
        background: "transparent",
        animations: { enabled: true, speed: 300 },
      },
      colors: [
        "#3b82f6",
        "#2563eb",
        "#1e40af",
        "#1e3a8a",
        "#1e293b",
        "#111827",
      ],

      labels: topClubs.slice(0, 6).map((club) => club.displayName),
      legend: {
        position: "bottom" as const,
        labels: { colors: "#3b82f6" },
        fontSize: width < 640 ? "10px" : "12px",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total Activity",
                color: "#3b82f6",
                fontSize: width < 640 ? "14px" : "16px",
                fontWeight: 600,
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => `${val.toFixed(1)}%`,
        style: {
          fontSize: width < 640 ? "10px" : "12px",
          fontWeight: "bold",
          colors: ["#fff"],
        },
      },
      tooltip: {
        theme: "light",
        y: { formatter: (val: number) => `${val} activities` },
      },
    }),
    [topClubs, width]
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-3 sm:p-6 space-y-6 sm:space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {userStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border border-blue-200 dark:border-blue-800 rounded-xl p-3 sm:p-4" // Reduced padding on mobile
            >
              <div className="flex items-center justify-between pb-2">
                <h2 className="text-xs sm:text-sm font-semibold text-slate-700">
                  {stat.name}
                </h2>
                <div className="p-2 sm:p-3 rounded-2xl">
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-900" />
                </div>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Active members
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <section className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow rounded-2xl overflow-hidden">
              <header className="border-b border-gray-200 dark:border-gray-800 py-3 sm:py-4 px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  Activity Flow
                </h2>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  Visualization of club engagement levels
                </p>
              </header>
              <div className="p-4 sm:p-6">
                {mounted && (
                  <Chart
                    options={activityChartOptions}
                    series={[
                      {
                        name: "Activity Level",
                        data: clubData.ClubsActivity.map((club) => club.value),
                      },
                    ]}
                    type="area"
                    height={width < 640 ? 250 : 350}
                  />
                )}
              </div>
            </section>
            <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow rounded-2xl">
              <header className="border-b border-gray-200 dark:border-gray-800 py-3 sm:py-4 px-4 sm:px-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Top Performers
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Most active clubs this period
                </p>
              </header>
              <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                {topClubs.slice(0, 5).map((club, index) => (
                  <div
                    key={club.name}
                    className="flex items-center justify-between p-2 sm:p-3 rounded-xl bg-blue-100/30 dark:bg-gray-800 odd:bg-blue-400/20" // Reduced padding on mobile
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div
                        className={` ${
                          index === 0
                            ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                            : ""
                        } ${
                          index === 1
                            ? "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
                            : ""
                        } ${
                          index === 2
                            ? "bg-gradient-to-r from-amber-600 to-amber-800 text-white"
                            : ""
                        } ${
                          index > 2
                            ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                            : ""
                        } px-2 sm:px-3 py-1 font-bold shadow rounded-full text-xs sm:text-sm `}
                      >
                        #{index + 1}
                      </div>
                      <span className="text-sm sm:text-base text-gray-800 dark:text-gray-100 font-semibold">
                        {club.displayName}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-50">
                      {club.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow rounded-2xl overflow-hidden">
              <header className="border-b border-gray-200 dark:border-gray-800 py-3 sm:py-4 px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  Popularity Spectrum
                </h2>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  Radial visualization of club popularity metrics
                </p>
              </header>
              <div className="p-4 sm:p-6">
                {mounted && (
                  <Chart
                    options={popularityChartOptions}
                    series={topLikedClubs
                      .slice(0, 5)
                      .map((club) =>
                        Math.round(
                          (club.value /
                            Math.max(...topLikedClubs.map((c) => c.value))) *
                            100
                        )
                      )}
                    type="radialBar"
                    height={width < 640 ? 250 : 350}
                  />
                )}
              </div>
            </section>
            <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow rounded-2xl overflow-hidden">
              <header className="border-b border-gray-200 dark:border-gray-800 py-3 sm:py-4 px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  Activity Distribution
                </h2>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                  Donut visualization of club activity shares
                </p>
              </header>
              <div className="p-4 sm:p-6">
                {mounted && (
                  <Chart
                    options={donutOptions}
                    series={topClubs.slice(0, 6).map((club) => club.value)}
                    type="donut"
                    height={width < 640 ? 250 : 350}
                  />
                )}
              </div>
            </section>
          </div>
          <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow rounded-2xl overflow-hidden">
            <header className="border-b border-gray-200 dark:border-gray-800 py-3 sm:py-4 px-4 sm:px-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Performance Correlation
              </h2>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                Smooth trend analysis comparing activity levels with popularity
                metrics
              </p>
            </header>
            <div className="p-4 sm:p-6">
              {mounted && (
                <Chart
                  options={trendsChartOptions}
                  series={[
                    {
                      name: "Activity Level",
                      data: clubData.ClubsActivity.map((club) => club.value),
                    },
                    {
                      name: "Popularity Score",
                      data: clubData.ClubsActivity.map(
                        (club) =>
                          clubData.MostLikeClub.find(
                            (liked) => liked.name === club.name
                          )?.value || 0
                      ),
                    },
                  ]}
                  type="line"
                  height={width < 640 ? 300 : 400}
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
