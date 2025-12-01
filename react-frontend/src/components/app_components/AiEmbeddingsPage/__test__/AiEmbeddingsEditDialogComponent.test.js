import React from "react";
import { render, screen } from "@testing-library/react";

import AiEmbeddingsEditDialogComponent from "../AiEmbeddingsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders aiEmbeddings edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AiEmbeddingsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("aiEmbeddings-edit-dialog-component")).toBeInTheDocument();
});
