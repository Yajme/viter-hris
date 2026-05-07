import useQueryData from "#functions/custom-hooks/useQueryData";
import { apiVersion, formatDate } from "#functions/functions-general";
import { useState } from "react";
import { SectionHeader, SectionCard } from "#partials/cards";
import ContentSpinner from "#partials/spinners/ContentSpinner";
import { PiConfetti } from "react-icons/pi";
import { FaBuilding, FaBullhorn, FaCalendar, FaUsers } from "react-icons/fa6";
const Avatar = ({ name }) => {
    const initials = name
        .split(",")
        .reverse()
        .map((p) => p.trim()[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div
            className={`flex bg-primary rounded-full justify-center items-center min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem] text-white pt-0.5 uppercase`}
        >
            {initials}
        </div>
    );
};

const Badge = ({ children }) => {
    return <span className={`text-xs font-bold `}>{children}</span>;
};

const whos_out = [
    {
        name: "Doe, Jane",
        type: "Maternity Leave",
        days: 74,
        period: "TODAY",
    },
    {
        name: "Doe, John",
        type: "Vacation Leave",
        days: 1,
        period: "TODAY",
    },
    {
        name: "Doe, Jane",
        type: "Maternity Leave",
        days: 74,
        period: "TOMORROW",
    },
];

const NewEmployee = () => {
    const {
        isLoading,
        isFetching,
        data: dataNewEmployee,
    } = useQueryData(
        `${apiVersion}/controllers/dev/employees/filter.php?filter=new`,
        "get",
        "employee",
    );

    return (
        <>
            <SectionCard>
                <SectionHeader
                    icon=<FaBuilding />
                    title="Welcome to Frontline Business Solutions Inc"
                    color="text-primary"
                />
                {isLoading ? (
                    <ContentSpinner />
                ) : dataNewEmployee.count == 0 ? (
                    <div className="px-4 py-6 text-center">
                        <p className="text-xs text-gray-400 italic">
                            No new employee yet.
                        </p>
                    </div>
                ) : (
                    <div className="px-4 py-6">
                        {dataNewEmployee?.data.map((celebration, key) => {
                            return (
                                <div
                                    key={key}
                                    className="flex items-center gap-3"
                                >
                                    <Avatar
                                        name={`${celebration.employee_last_name}, ${celebration.employee_first_name}`}
                                    />
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate">
                                            {`${celebration.employee_first_name} ${celebration.employee_last_name}`}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatDate(
                                                celebration.employee_start_work_date,
                                                "long-date",
                                            )}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </SectionCard>
        </>
    );
};
const Celebrations = () => {
    const {
        isLoading,
        isFetching,
        data: dataCelebrations,
    } = useQueryData(
        `${apiVersion}/controllers/dev/employees/filter.php?filter=birthday_by_month`,
        "get",
        "celebration",
    );
    return (
        <>
            <SectionCard>
                <SectionHeader
                    icon=<PiConfetti />
                    title="Celebrations"
                    color="text-primary"
                />
                {isLoading ? (
                    <ContentSpinner />
                ) : dataCelebrations.count == 0 ? (
                    <div className="px-4 py-6 text-center">
                        <div className="text-3xl mb-3">
                            <PiConfetti />
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            No celebration for today. However, we would like to
                            express our sincere appreciation and gratitude for
                            all the hard work of our employees.
                        </p>
                    </div>
                ) : (
                    <div className="px-4 py-6">
                        {dataCelebrations?.data.map((celebration, key) => {
                            return (
                                <div
                                    key={key}
                                    className="flex items-center gap-3"
                                >
                                    <Avatar
                                        name={`${celebration.employee_last_name}, ${celebration.employee_first_name}`}
                                    />
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-800 truncate">
                                            {`${celebration.employee_first_name} ${celebration.employee_last_name}`}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatDate(
                                                celebration.employee_birthday,
                                                "long-date",
                                            )}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </SectionCard>
        </>
    );
};
const Team = () => {
    const {
        isLoading,
        isFetching,
        data: dataTeam,
    } = useQueryData(
        `${apiVersion}/controllers/dev/employees/filter.php?filter=department&department_id=7`,
        "get",
        "team",
    );

    return (
        <>
            <SectionCard>
                <SectionHeader
                    icon=<FaUsers />
                    title="My Team"
                    color="text-primary"
                />
                <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {isLoading ? (
                        <ContentSpinner />
                    ) : (
                        dataTeam?.data.map((member) => (
                            <div
                                key={`${member.employee_first_name} ${member.employee_last_name}`}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Avatar
                                    name={`${member.employee_last_name}, ${member.employee_first_name}`}
                                    size="sm"
                                />
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">
                                        {`${member.employee_first_name} ${member.employee_last_name}`}
                                    </p>
                                    <Badge>{member.department_name}</Badge>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </SectionCard>
        </>
    );
};
const Announcements = () => {
    const {
        isLoading,
        isFetching,
        data: dataMemo,
    } = useQueryData(
        `${apiVersion}/controllers/dev/memo/index.php`,
        "get",
        "memo",
    );

    return (
        <>
            <SectionCard className="h-[520px] flex flex-col">
                <SectionHeader
                    icon=<FaBullhorn />
                    title="Announcement"
                    color="text-primary"
                />
                <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-gray-50">
                    {isLoading ? (
                        <ContentSpinner />
                    ) : (
                        dataMemo?.data.map((memo, key) => (
                            <div
                                key={key}
                                className="px-5 py-4 flex item-center gap-10"
                            >
                                <FaBullhorn size={32} />
                                <div>
                                    <h4 className="text-lg">
                                        Memo No. {memo.memo_date.split("-")[1]}
                                        {memo.memo_date.split("-")[2]}, Series{" "}
                                        {memo.memo_date.split("-")[0]}:
                                        {memo.memo_text.split("\n")[0]}
                                    </h4>

                                    <div className="text-lg">
                                        <b>Date:</b>{" "}
                                        {formatDate(memo.memo_date)}
                                    </div>
                                    <div className="text-sm text-gray-800 leading-relaxed text-justify whitespace-pre-line">
                                        {memo.memo_text}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </SectionCard>
        </>
    );
};
export default function DashboardGrid() {
    const byPeriod = (p) => whos_out.filter((w) => w.period === p);

    return (
        <>
            {/* Main 2-col grid */}
            <main className="mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
                {/* LEFT COLUMN */}
                <div className="flex flex-col gap-5">
                    {/* Who's Out */}
                    <SectionCard>
                        <SectionHeader
                            icon=<FaCalendar />
                            title="Who's Out"
                            color="text-primary"
                        />
                        <div className="px-4 py-3 space-y-4">
                            {["TODAY", "TOMORROW"].map((period) => (
                                <div key={period}>
                                    <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-2">
                                        {period}
                                    </p>
                                    <div className="space-y-3">
                                        {byPeriod(period).map((e, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3"
                                            >
                                                <Avatar name={e.name} />
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-gray-800 truncate">
                                                        {e.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {e.type}
                                                    </p>
                                                    <span className="text-[10px] text-rose-400 font-medium">
                                                        Day(s): {e.days}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    {/* Celebrations */}
                    <Celebrations />

                    {/* Welcome */}
                    <NewEmployee />
                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col gap-5 min-h-0">
                    {/* Announcements */}
                    {/* <SectionCard>
                        <SectionHeader
                            icon="📢"
                            title="Announcement"
                            color="text-rose-500"
                        />
                        <div className="divide-y divide-gray-50">
                            {announcements.map((a) => (
                                <div key={a.id} className="px-5 py-4">
                                    <button
                                        onClick={() =>
                                            setExpanded((e) => ({
                                                ...e,
                                                [a.id]: !e[a.id],
                                            }))
                                        }
                                        className="w-full text-left flex items-start gap-3 group"
                                    >
                                        <div className="mt-0.5 text-gray-300 group-hover:text-rose-400 transition-colors">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M22 8.5a6.5 6.5 0 01-11.6 4L3 18V6l7.4 5.5A6.5 6.5 0 0122 8.5z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-rose-600 leading-snug">
                                                {a.title}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                Date: {a.date}
                                            </p>
                                        </div>
                                        <span className="text-gray-300 text-xs mt-1">
                                            {expanded[a.id] ? "▲" : "▼"}
                                        </span>
                                    </button>

                                    {expanded[a.id] && (
                                        <div className="mt-3 ml-7 space-y-2">
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {a.body}
                                            </p>
                                            {a.list && (
                                                <ol className="list-decimal list-inside space-y-0.5">
                                                    {a.list.map((item, i) => (
                                                        <li
                                                            key={i}
                                                            className="text-xs text-gray-500"
                                                        >
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ol>
                                            )}
                                            {a.note && (
                                                <p className="text-xs text-gray-500 italic border-l-2 border-rose-200 pl-3">
                                                    {a.note}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </SectionCard>*/}
                    <Announcements />
                    {/* My Team */}
                    <Team />
                </div>
            </main>
        </>
    );
}
