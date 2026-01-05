import React from "react";
import { render, screen } from "@testing-library/react";

import EmailCreateDialogComponent from "../EmailCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders email create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <EmailCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("email-create-dialog-component")).toBeInTheDocument();
});
