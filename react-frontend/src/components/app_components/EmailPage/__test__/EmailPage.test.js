import React from "react";
import { render, screen } from "@testing-library/react";

import EmailPage from "../EmailPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders email page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmailPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("email-datatable")).toBeInTheDocument();
    expect(screen.getByRole("email-add-button")).toBeInTheDocument();
});
