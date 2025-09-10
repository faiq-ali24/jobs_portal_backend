import React from "react";
import Login, { UserLogin } from "../organisms/login";

interface Company {
  id: number;
  name: string;
  subdomain: string;
}

interface LoginTemplateProps {
  companies: Company[];
  onLogin: (data: UserLogin) => void;
}

const LoginTemplate: React.FC<LoginTemplateProps> = ({
  companies,
  onLogin,
}) => {
  return (
    <Login companies={companies} onSubmit={onLogin} />
  );
};

export default LoginTemplate;
