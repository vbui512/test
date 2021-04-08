import { Button, Chip, Divider, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { timestampFromFormDate } from "util/dates";
import { apiFetch, Endpoint } from "util/endpoints";
import { IStats } from "util/stats";
import { IUser } from "util/users";
import DisabilityStats from "./DisabilityStats";
import ExportStats from "./ExportStats";
import ReferralStats from "./ReferralStats";
import StatsDateFilter, { blankDateRange, IDateRange } from "./StatsDateFilter";
import StatsUserFilter from "./StatsUserFilter";
import VisitStats from "./VisitStats";

const Stats = () => {
    const [dateFilterOpen, setDateFilterOpen] = useState(false);
    const [dateRange, setDateRange] = useState(blankDateRange);
    const [userFilterOpen, setUserFilterOpen] = useState(false);
    const [users, setUsers] = useState<IUser[]>([]);
    const [user, setUser] = useState<IUser | null>(null);
    const [exportOpen, setExportOpen] = useState(false);
    const [stats, setStats] = useState<IStats>();
    const [errorLoading, setErrorLoading] = useState(false);

    const FilterBar = () => (
        <div style={{ textAlign: "center" }}>
            <Button variant="outlined" onClick={() => setDateFilterOpen(true)}>
                Filter by Date
            </Button>{" "}
            <Button variant="outlined" onClick={() => setUserFilterOpen(true)}>
                Filter by User
            </Button>{" "}
            <Button variant="outlined" onClick={() => setExportOpen(true)}>
                Export to CSV
            </Button>{" "}
            <br />
            <br />
            {dateRange.from.length && dateRange.to.length ? (
                <Chip
                    label={`From ${dateRange.from} to ${dateRange.to}`}
                    onDelete={() => setDateRange(blankDateRange)}
                />
            ) : (
                <Chip label="All Time" />
            )}{" "}
            {user ? (
                <Chip
                    label={`${user.first_name} (${user.username})`}
                    onDelete={() => setUser(null)}
                />
            ) : (
                <Chip label="All Users" />
            )}
        </div>
    );

    useEffect(() => {
        apiFetch(Endpoint.USERS)
            .then((resp) => resp.json())
            .then((users) => setUsers(users))
            .catch(() => setErrorLoading(true));
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams();

        ["from", "to"].forEach((field) => {
            const fieldVal = dateRange[field as keyof IDateRange];

            if (fieldVal) {
                urlParams.append(field, String(timestampFromFormDate(fieldVal)));
            }
        });

        if (user) {
            urlParams.append("user_id", String(user.id));
        }

        apiFetch(Endpoint.STATS, `?${urlParams.toString()}`)
            .then((resp) => resp.json())
            .then((stats) => setStats(stats))
            .catch(() => setErrorLoading(true));
    }, [dateRange, user]);

    return errorLoading ? (
        <Alert severity="error">
            Something went wrong loading the statistics. Please try again.
        </Alert>
    ) : (
        <>
            <FilterBar />
            <StatsDateFilter
                open={dateFilterOpen}
                onClose={() => setDateFilterOpen(false)}
                range={dateRange}
                setRange={setDateRange}
            />
            <StatsUserFilter
                open={userFilterOpen}
                onClose={() => setUserFilterOpen(false)}
                users={users}
                user={user}
                setUser={setUser}
            />
            <ExportStats open={exportOpen} onClose={() => setExportOpen(false)} stats={stats} />
            <br />
            <Divider />
            <br />
            <Typography variant="h2">Visits</Typography>
            <VisitStats stats={stats} />
            <br />
            <Divider />
            <br />
            <Typography variant="h2">Referrals</Typography>
            <ReferralStats stats={stats} />
            <br />
            <Divider />
            <br />
            <Typography variant="h2">Disabilities</Typography>
            <Typography variant="body1">Filters do not apply to disabilities.</Typography>
            <br />
            <DisabilityStats stats={stats} />
        </>
    );
};

export default Stats;
