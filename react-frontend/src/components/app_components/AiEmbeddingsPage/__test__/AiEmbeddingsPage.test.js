import React from "react";
import { render, screen } from "@testing-library/react";

import AiEmbeddingsPage from "../AiEmbeddingsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders aiEmbeddings page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AiEmbeddingsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("aiEmbeddings-datatable")).toBeInTheDocument();
    expect(screen.getByRole("aiEmbeddings-add-button")).toBeInTheDocument();
});
