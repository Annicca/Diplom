import { AxiosError } from "axios";
import { Message } from "src/components/message/Message";
import { ETypeMessage } from "src/types/ETypeMessage";

interface ConditionalRenderProps {
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
  loadingElement: JSX.Element;
  data: object | null | undefined;
  children: JSX.Element;
}

// Функция-хелпер для условного рендеринга
export const withConditionalRender = ({
  isLoading,
  isError,
  error,
  loadingElement,
  data,
  children,
}: ConditionalRenderProps) => {
  if (isLoading || !data) {
    return loadingElement;
  }

  if (isError) {
    return (
      <Message type={ETypeMessage.ERROR}>
        {error
          ? error.response
            ? String(error.response.data)
            : error.message
          : "Произошла ошибка"}
      </Message>
    );
  }

  return children;
};
