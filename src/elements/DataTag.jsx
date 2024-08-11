import { Tag } from "@chakra-ui/react";

export const DataTags = ({ isPatreon, isRox, isProgramAI }) => {
  return (
    <>
      {isRox ? (
        <Tag size="sm" variant="solid" colorScheme="purple" m={1}>
          Rox
        </Tag>
      ) : null}
      {isPatreon ? (
        <Tag size="sm" variant="solid" colorScheme="teal" m={1}>
          Patreon
        </Tag>
      ) : null}
      {isProgramAI ? (
        <Tag size="sm" variant="solid" colorScheme="pink" m={1}>
          Program AI App
        </Tag>
      ) : null}
      <br /> <br />
    </>
  );
};
