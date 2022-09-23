import { Button, Container, Grid, Input, Radio, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSetState } from "../../hooks/useSetState";
import { useAppSelector } from "../../redux/store";

const CreateProposal = () => {
  const { daoContract } = useAppSelector((state) => state.loadContractsReducer);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [deadline, setDeadline, getDeadline] = useSetState<string>("");
  const [arrayOfAddresses, setArrayOfAddresses] = useState<string[]>([]);
  const [canVoteAddress, setCanVoteAddress] = useState<string>("");
  const [timeUnit, setTimeUnit] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeadline = async () => {
    let d_line: string | number = await getDeadline();
    d_line = parseInt(d_line);
    if (deadline) {
      if (timeUnit === "minutes") {
        let endTime = d_line * 60;
        return endTime;
      } else if (timeUnit === "seconds") {
        let endTime = d_line;
        return endTime;
      } else {
        let endTime = d_line * 3600;
        return endTime;
      }
    }
  };

  const handleAddresses = () => {
    if (arrayOfAddresses.length < 4 && canVoteAddress.length > 1) {
      let addressArray = [...arrayOfAddresses, canVoteAddress];
      setArrayOfAddresses(addressArray);
      setCanVoteAddress("");
    }
  };

  const removeAddress = (i: number) => {
    setArrayOfAddresses(
      arrayOfAddresses.filter((address, index) => index !== i)
    );
  };

  const createProposal = async () => {
    let d_line: string | number | undefined = await handleDeadline();
    d_line = d_line?.toString();
    try {
      if (daoContract) {
        setLoading(true);
        const transaction = daoContract.createProposal(
          title as string,
          description as string,
          d_line as any,
          arrayOfAddresses as string[]
        );
        const receipt = await (await transaction).wait();
        if (receipt) {
          console.log("receipt", receipt);
          setLoading(false);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {}, [daoContract]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "5rem",
      }}
    >
      <Container sm>
        <Grid.Container>
          <Grid css={{ marginBottom: "4rem" }} xs={12} sm={12} md={6} lg={6}>
            <Input
              value={title as string}
              onChange={(e) => setTitle(e.target.value)}
              width="20rem"
              labelPlaceholder="Enter Title"
            />
          </Grid>
          <Grid css={{ marginBottom: "4rem" }} xs={12} sm={12} md={6} lg={6}>
            <Input
              value={description as string}
              onChange={(e) => setDescription(e.target.value)}
              width="20rem"
              labelPlaceholder="Enter Description"
            />
          </Grid>

          <Grid css={{ marginBottom: "4rem" }} xs={12} sm={12} md={6} lg={6}>
            <div>
              <Input
                value={deadline}
                width="20rem"
                labelPlaceholder="Enter deadline"
                onChange={(e) => setDeadline(e.target.value)}
              />
              <Radio.Group
                orientation="horizontal"
                label=""
                defaultValue="hours"
                value={timeUnit}
                onChange={(e) => {
                  setTimeUnit(e);
                }}
              >
                <Radio description="default" size="xs" value="hours">
                  Hours
                </Radio>
                <Radio size="xs" value="minutes">
                  Minutes
                </Radio>
                <Radio size="xs" value="seconds">
                  Seconds
                </Radio>
              </Radio.Group>
            </div>
          </Grid>
          <Grid css={{ marginBottom: "4rem" }} xs={12} sm={12} md={6} lg={6}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div>
                <Input
                  css={{ marginRight: "1rem" }}
                  width="16rem"
                  labelPlaceholder="Add Address"
                  value={canVoteAddress}
                  onChange={(e) => setCanVoteAddress(e.target.value)}
                />
                {arrayOfAddresses?.map((arr, i) => {
                  return (
                    <Text key={i} onClick={() => removeAddress(i)}>
                      {arrayOfAddresses[i]}
                    </Text>
                  );
                })}
                <Button onClick={handleAddresses} size={"xs"}>
                  Add Address
                </Button>
              </div>
            </div>
          </Grid>
        </Grid.Container>
        <div>
          <Button onClick={createProposal}>Create Proposal</Button>
        </div>
      </Container>
    </div>
  );
};

export default CreateProposal;
