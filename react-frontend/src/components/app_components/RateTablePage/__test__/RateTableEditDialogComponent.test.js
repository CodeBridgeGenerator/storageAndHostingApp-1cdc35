import React from "react";
import { render, screen } from "@testing-library/react";

import RateTableEditDialogComponent from "../RateTableEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders rateTable edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RateTableEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("rateTable-edit-dialog-component")).toBeInTheDocument();
});
