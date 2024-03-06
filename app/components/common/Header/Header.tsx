import { AccountInformation } from '../AccountInformation';

export const Header = () => {
  return (
    <div className="px-6 md:px-12 sm:px-2">
      <div className="flex justify-between items-centers">
        <AccountInformation />
      </div>
    </div>
  );
};
