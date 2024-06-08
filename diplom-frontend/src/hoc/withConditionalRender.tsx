import { AxiosError } from "axios";
import { Message } from "src/components/message/Message";
import { ETypeMessage } from "src/types/ETypeMessage";

interface ConditionalProps {
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
  loadingElement: JSX.Element;
}

type TConditionalProps<T extends object> = T & ConditionalProps;

export function withConditional<T extends object>(
  Component: React.ComponentType<T>
) {
  return (props: TConditionalProps<T>) => {
    const { isLoading, isError, error, loadingElement, ...componentProps } =
      props;
    if (isLoading) {
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

    return <Component {...(componentProps as T)} />;
  };
}
