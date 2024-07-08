import Listing from "../models/list.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const list = await Listing.create(req.body);
    return res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
export const showListing = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const listing = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  } else {
    next(errorHandler(401, "unauthorized"));
  }
};
export const delListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(401, "listing not fouund"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "unauthorized"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted successfully");
  } catch (error) {
    next(error);
  }
};
export const updateList = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(401, "listing not found"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "unauthorized"));
  }
  try {
    const updatedlist = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedlist);
  } catch (error) {
    next(error);
  }
};
export const getlist = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(401, "listing not found"));
    }
    // if(req.user.id !== listing.userRef){return next(errorHandler(401,"unauthorized"))}
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
export const searchList = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const startIndex = parseInt(req.query.startindex) || 0;
    let offers = req.query.offer;
    if (offers === undefined || offers === "false") {
      offers = { $in: [false,true] };
    }
    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false" || furnished===false) {
      furnished = { $in: [false,true] };
    }
    let parking = req.query.parking;
    if (parking === undefined || parking === "false" ||parking===false) {
      parking = { $in: [false,true] };
    }
    let type = req.query.type;
    if (type === "all" || type === undefined) {
      type = { $in: ["rent", "sale"] };
    }
    const searchkey = req.query.searchkey || " ";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: {$regex: searchkey, $options: "i"},
      offers,
      parking,
      furnished,
     type
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
