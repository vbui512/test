import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";

export interface IDateRange {
    from: string;
    to: string;
}

export const blankDateRange: IDateRange = {
    from: "",
    to: "",
};

interface IProps {
    open: boolean;
    onClose: () => void;
    range: IDateRange;
    setRange: (range: IDateRange) => void;
}

const StatsDateFilter = ({ open, onClose, range, setRange }: IProps) => {
    const handleSubmit = (values: IDateRange) => {
        setRange({ ...values });
        onClose();
    };

    const handleClear = () => {
        setRange({ ...blankDateRange });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Filter by Date</DialogTitle>
            <Formik initialValues={range} onSubmit={handleSubmit}>
                <Form>
                    <DialogContent>
                        <Field
                            component={TextField}
                            label="From"
                            variant="outlined"
                            type="date"
                            required
                            InputLabelProps={{ shrink: true }}
                            name="from"
                        />
                        <br />
                        <br />
                        <Field
                            component={TextField}
                            label="To"
                            variant="outlined"
                            type="date"
                            required
                            InputLabelProps={{ shrink: true }}
                            name="to"
                        />
                        <br />
                        <br />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClear}>Clear</Button>
                        <Button color="primary" type="submit">
                            Filter
                        </Button>
                    </DialogActions>
                </Form>
            </Formik>
        </Dialog>
    );
};

export default StatsDateFilter;
