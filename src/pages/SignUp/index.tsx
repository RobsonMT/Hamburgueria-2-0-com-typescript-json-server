import { Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

import { SignUpForm } from "./SignUpForm";
import { FormInfo } from "../../components/Form/FomInfo";
import { useAuth } from "../../contexts/Auth";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("Digite um email válido."),
  password: yup.string().required("Senha obrigatória"),
  // .matches(
  //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
  //   "The password must include letters, numbers and a special character"
  // ),
  confirm_password: yup
    .string()
    .required("Confirmação de senha obrigatória")
    .oneOf([yup.ref("password")], "Senhas diferentes"),
});

interface ISignUpData {
  name: string;
  email: string;
  password: string;
  confirm_password?: string;
}

export const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ISignUpData>({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignUp = (data: ISignUpData) => {
    signUp(data);
  };

  return (
    <Flex
      padding={["10px 15px", "10px 15px", "0px", "0px"]}
      alignItems="center"
      justifyContent="center"
      height={["auto", "auto", "100vh", "100vh"]}
    >
      <Flex
        w={["100%", "100%", "100%", "80%"]}
        justifyContent="center"
        flexDirection={["column", "column", "row-reverse", "row-reverse"]}
        alignItems="center"
      >
        <FormInfo />
        <SignUpForm
          errors={errors}
          handleSignUp={handleSubmit(handleSignUp)}
          loading={loading}
          register={register}
        />
      </Flex>
    </Flex>
  );
};
