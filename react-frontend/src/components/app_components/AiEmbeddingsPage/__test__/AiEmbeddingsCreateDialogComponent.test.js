import React from "react";
import { render, screen } from "@testing-library/react";

import AiEmbeddingsCreateDialogComponent from "../AiEmbeddingsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders aiEmbeddings create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <AiEmbeddingsCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("aiEmbeddings-create-dialog-component"),
  ).toBeInTheDocument();
});
