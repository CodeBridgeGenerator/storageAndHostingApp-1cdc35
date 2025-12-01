import React from "react";
import { render, screen } from "@testing-library/react";

import StorageBillPage from "../StorageBillPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders storageBill page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StorageBillPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("storageBill-datatable")).toBeInTheDocument();
    expect(screen.getByRole("storageBill-add-button")).toBeInTheDocument();
});
