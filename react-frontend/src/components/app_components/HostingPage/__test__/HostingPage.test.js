import React from "react";
import { render, screen } from "@testing-library/react";

import HostingPage from "../HostingPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders hosting page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <HostingPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("hosting-datatable")).toBeInTheDocument();
    expect(screen.getByRole("hosting-add-button")).toBeInTheDocument();
});
