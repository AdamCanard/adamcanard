import GroupedList from "@/app/desktop/listcomps/groupedList";
import { Omit } from "@/app/omit";

export default function MobileListData(props: {
  list: object[];
  form: string[];
  title: string;
  search: string;
  group: string;
}) {
  const subStringer = (element: object) => {
    const list = Object.values(element);
    let subStringed = "";
    for (let i = 0; i < list.length - 1; i++) {
      subStringed += list[i] + " ";
    }
    return subStringed.indexOf(props.search) !== -1;
  };

  const sortBy = (list: object[], group: string) => {
    if (group === "") {
      return list;
    } else {
      const sortedList = list.sort((a, b) => {
        if (a[group as keyof object] < b[group as keyof object]) {
          return -1;
        } else if (a[group as keyof object] > b[group as keyof object]) {
          return 1;
        } else {
          return 0;
        }
      });

      return sortedList;
    }
  };
  const groupData = (list: object[], group: string) => {
    const sortedList = list.sort((a, b) => {
      if (a[group as keyof object] < b[group as keyof object]) {
        return -1;
      } else if (a[group as keyof object] > b[group as keyof object]) {
        return 1;
      } else {
        return 0;
      }
    });
    const groupedData: Record<string, object[]> = {};
    let str = "";
    for (let i = 0; i < sortedList.length; i++) {
      str = sortedList[i][group as keyof object];
      if (str in groupedData) {
        groupedData[str].push(sortedList[i]);
      } else {
        groupedData[str] = [sortedList[i]];
      }
    }
    return groupedData;
  };

  return (
    <div className="w-full flex flex-col overflow-y-scroll">
      {props.group === "" || props.group === Object.keys(props.list[0])[0] ? (
        <>
          {sortBy(props.list, props.group).map((listElement, index) => {
            const id: string = Object.values(listElement)[
              props.form.indexOf("id")
            ] as string;
            return (
              <div key={id + index}>
                {subStringer(listElement) && (
                  <div
                    id={"border"}
                    className="flex w-full h-full justify-between items-center p-2 "
                  >
                    <>
                      {Object.values(listElement).map((data, index: number) => {
                        if (!Omit.includes(props.form[index])) {
                          if ((data as string) !== "") {
                            return <div key={index + id}>{data as string}</div>;
                          }
                        }
                      })}
                    </>
                  </div>
                )}
              </div>
            );
          })}
        </>
      ) : (
        <GroupedList data={groupData(props.list, props.group)} />
      )}
    </div>
  );
}
