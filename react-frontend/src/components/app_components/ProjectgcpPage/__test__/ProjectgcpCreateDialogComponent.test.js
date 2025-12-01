import React from "react";
import { render, screen } from "@testing-library/react";

import ProjectgcpCreateDialogComponent from "../ProjectgcpCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders projectgcp create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProjectgcpCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("projectgcp-create-dialog-component")).toBeInTheDocument();
});
