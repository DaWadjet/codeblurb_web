import FilterButton from "@/components/common/FilterButton";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const min = 1;
const max = 5;
const RatingStart = () => {
  const [minRating, setMinRating] = useState<number>(min);

  return (
    <FilterButton
      value={minRating + "-" + max + " Stars"}
      subTitle={"Rating"}
      clear={() => {
        setMinRating(min);
      }}
      isDeleteIconActive={minRating !== min}
      // ClosedIconComponent={<FontAwesomeIcon icon={faStar} />}
      // OpenedIconComponent={<FontAwesomeIcon icon={faStar} />}
    >
      <div className="-mt-[6px] mb-4 flex w-60 px-4">
        {/*  <Slider
          min={min}
          max={max}
          range
          step={0.1}
          defaultValue={[min, max]}
          value={[minRating, max]}
          railStyle={{
            height: 4,
          }}
          trackStyle={{
            height: 4,
            backgroundColor: "rgba(59, 130, 246, 1)",
          }}
          handleStyle={[
            {
              height: 14,
              width: 14,
              borderRadius: 200,
              borderWidth: 0,
              backgroundColor: "rgba(59, 130, 246, 1)",
              opacity: 1,
            },
            {
              height: 14,
              width: 14,
              borderRadius: 200,
              borderWidth: 0,
              backgroundColor: "#97a7c0",
              opacity: 1,
            },
          ]}
          marks={{
            [min]: {
              style: {
                fontSize: 16,
                border: "solid",
                borderWidth: 1,
                borderColor: "rgba(235, 238, 255, 1)",
                paddingRight: 4,
                paddingLeft: 4,
                paddingBottom: 2,
                paddingTop: 2,
                borderRadius: 6,
                fontWeight: 600,
              },
              label: `${min}`,
            },
            [max]: {
              style: {
                fontSize: 16,
                border: "solid",
                borderWidth: 1,
                borderColor: "rgba(235, 238, 255, 1)",
                paddingRight: 4,
                paddingLeft: 4,
                paddingBottom: 2,
                paddingTop: 2,
                borderRadius: 6,
                fontWeight: 600,
              },
              label: `${max}`,
            },
          }}
          onChange={(value: any) => setMinRating(value[0] as number)}
        /> */}
      </div>
    </FilterButton>
  );
};

export default RatingStart;
