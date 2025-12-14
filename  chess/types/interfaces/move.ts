import PositionType from "@/ chess/types/interfaces/position";

export default interface MoveType {
    from: PositionType;
    to: PositionType;
}