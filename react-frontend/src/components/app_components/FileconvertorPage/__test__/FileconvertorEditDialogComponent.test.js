import React from "react";
import { render, screen } from "@testing-library/react";

import FileconvertorEditDialogComponent from "../FileconvertorEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders fileconvertor edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <FileconvertorEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("fileconvertor-edit-dialog-component"),
  ).toBeInTheDocument();
});
