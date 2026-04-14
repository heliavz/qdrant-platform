import React from "react";
import { Card, CardContent, Typography, Box, Link } from "@mui/material";
import { ArrowRight } from "lucide-react";

const InfoCard = ({
  icon: Icon,
  title,
  description,
  href,
  ctaText = "Learn More",
}) => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s ease",
        "&:hover": {
          borderColor: "rgba(255, 255, 255, 0.4)",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flexGrow: 1,
          p: "20px",
          "&:last-child": { pb: "20px" },
        }}
      >
        {/* Icon */}
        {Icon && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              bgcolor: "rgba(59, 130, 246, 0.1)",
              flexShrink: 0,
            }}
          >
            <Icon size={18} color="#60a5fa" />
          </Box>
        )}

        {/* Title */}
        <Typography
          variant="subtitle2"
          sx={{ color: "text.primary", fontWeight: 600 }}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", lineHeight: 1.6, flexGrow: 1 }}
        >
          {description}
        </Typography>

        {/* CTA */}
        {href && (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "text.primary",
              fontSize: "0.875rem",
              fontWeight: 500,
              mt: "auto",
              width: "fit-content",
              "&:hover": { color: "primary.main" },
            }}
          >
            {ctaText}
            <ArrowRight size={14} />
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default InfoCard;
