import { wrapWith } from "../utils/wrap_with";

const ObxBuilder = (widget: string) => {
  return `Obx(
    () {
    return ${widget};
  },
)`;
};

const Obx = (widget: string) => {
  return `Obx(
  () => ${widget},
)`;
};

export const wrapWithObxBuilder = async () => wrapWith(ObxBuilder);
export const wrapWithObx = async () => wrapWith(Obx);